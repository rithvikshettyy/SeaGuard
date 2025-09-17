
import requests
from datetime import datetime
from typing import Dict, Any, Optional
from zoneinfo import ZoneInfo  # Accurate timezone handling
import concurrent.futures


class IndiaFishingAlerts:
    def __init__(self):
        self.session = requests.Session()
        self.session.timeout = 8
        self.IST = ZoneInfo("Asia/Kolkata")
        self.limits = {
            'wind_ms': 12.0, 'wave_m': 2.5, 'rain_mm': 10.0,
            'swell_m': 2.0, 'current_ms': 1.0,
            'visibility_m': 1000, 'visibility_m_night': 5000,
        }

    def get_alerts(self, lat: float, lon: float, location_name: str = "") -> Dict[str, Any]:
        """Evaluate safety probability for fishing."""
        try:
            weather_params = {
                "current": "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,precipitation_probability,weather_code,pressure_msl,wind_speed_10m,visibility",
                "daily": "sunrise,sunset"
            }
            marine_params = {
                "current": "wave_height,wave_direction,wind_wave_period,swell_wave_height,ocean_current_velocity"
            }
            
            with concurrent.futures.ThreadPoolExecutor() as executor:
                future_weather = executor.submit(self._fetch, "https://api.open-meteo.com/v1/forecast", lat, lon, **weather_params)
                future_marine = executor.submit(self._fetch, "https://marine-api.open-meteo.com/v1/marine", lat, lon, **marine_params)
                weather = future_weather.result()
                marine = future_marine.result()

            # Determine day/night
            is_day = self._is_daytime(weather)
            time_of_day = "Day" if is_day else "Night"

            # Factor checks
            checks = [
                self._score(weather, "current.wind_speed_10m", self.limits["wind_ms"], "Wind", "m/s"),
                self._score(weather, "current.precipitation", self.limits["rain_mm"], "Rain", "mm", invert=True),
                self._score(weather, "current.visibility",
                            self.limits["visibility_m"] if is_day else self.limits["visibility_m_night"],
                            "Visibility", "m", higher_is_better=True, scale=1),
                self._score(marine, "current.wave_height", self.limits["wave_m"], "Wave", "m"),
                self._score(marine, "current.swell_wave_height", self.limits["swell_m"], "Swell", "m"),
                self._score(marine, "current.ocean_current_velocity", self.limits["current_ms"], "Current", "m/s"),
            ]

            valid_scores = [c["probability"] for c in checks if c["probability"] is not None]
            avg_score = sum(valid_scores) / len(valid_scores) if valid_scores else 0

            # If it's night, force unsafe
            safe = avg_score >= 75 and is_day
            status = "🟢 SAFE" if safe else "🔴 UNSAFE"

            print("DEBUG: Marine Data:", marine.get("current", {}))

            return {
                "safe": safe,
                "status": status,
                "message": " | ".join([c["message"] for c in checks if c["message"]]),
                "advice": "Good for fishing" if safe else "Stay on shore",
                "risk_probability": round(avg_score, 2),
                "location": location_name or f"{lat:.2f}°N, {lon:.2f}°E",
                "time": datetime.now(self.IST).strftime("%d-%m-%Y %H:%M IST"),
                "time_of_day": time_of_day,
                "data": {
                    "weather": weather.get("current", {}),
                    "marine": marine.get("current", {}),
                    "factors": checks
                },
            }
        except Exception as e:
            return self._error(str(e), location_name)

    def _fetch(self, url: str, lat: float, lon: float, **params) -> Dict[str, Any]:
        try:
            params.update({"latitude": lat, "longitude": lon, "timezone": "Asia/Kolkata"})
            r = self.session.get(url, params=params)
            r.raise_for_status()
            return r.json()
        except Exception:
            return {}

    def _is_daytime(self, weather: Dict[str, Any]) -> bool:
        """Determine if it's currently daytime using IST correctly."""
        try:
            now_ist = datetime.now(self.IST)
            sr = datetime.fromisoformat(weather["daily"]["sunrise"][0]).replace(tzinfo=self.IST)
            ss = datetime.fromisoformat(weather["daily"]["sunset"][0]).replace(tzinfo=self.IST)
            return sr <= now_ist <= ss
        except Exception:
            return False  # If in doubt, assume night (safety first)

    def _get_nested(self, data: Dict[str, Any], path: str) -> Optional[float]:
        try:
            for key in path.split("."):
                data = data[key]
            return data
        except Exception:
            return None

    def _score(self, data: Dict[str, Any], path: str, limit: float, label: str, unit: str,
               invert: bool = False, higher_is_better: bool = False, scale: int = 1) -> Dict[str, Any]:
        """Calculate probability score for a single factor."""
        val = self._get_nested(data, path)
        if val is None:
            return {"factor": label, "probability": None, "message": f"{label} data unavailable"}

        val_scaled = val / scale

        if higher_is_better:
            score = min(100, (val / limit) * 100)
        else:
            score = max(0, 100 - ((val / limit) * 100))

        if invert:
            score = max(0, 100 - ((val / limit) * 100))

        msg = f"{label}: {val_scaled:.1f} {unit} (Score: {score:.0f}%)"
        return {"factor": label, "probability": round(score, 2), "message": msg}

    def _error(self, msg: str, location: str) -> Dict[str, Any]:
        return {
            "safe": False,
            "status": "❌ ERROR",
            "message": f"Data unavailable: {msg}",
            "advice": "Cannot assess - stay safe",
            "location": location,
            "time": datetime.now(self.IST).strftime("%d-%m-%Y %H:%M IST"),
            "time_of_day": "Unknown",
            "data": {},
        }
