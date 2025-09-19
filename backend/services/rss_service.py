import httpx
import xml.etree.ElementTree as ET
import html
import re
from datetime import datetime
from fastapi import HTTPException

class RssService:
    def __init__(self):
        self.NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse"
        self.GOOGLE_RSS_URL = "https://news.google.com/rss/search"
        self.HEADERS = {"User-Agent": "SeaGuardRssService/1.0"}

    async def _reverse_place(self, lat: float, lon: float) -> str:
        """Converts latitude and longitude to a place name using Nominatim."""
        async with httpx.AsyncClient(timeout=10.0, headers=self.HEADERS) as client:
            try:
                response = await client.get(
                    self.NOMINATIM_URL,
                    params={"format": "json", "lat": lat, "lon": lon, "zoom": 10, "addressdetails": 1}
                )
                response.raise_for_status()
                address = response.json().get("address", {})
                # Prioritize more specific location names
                for key in ("town", "city", "county", "state_district", "state", "region"):
                    if address.get(key):
                        return address[key]
                return ""
            except httpx.HTTPStatusError:
                # Log this error in a real app
                return ""
            except Exception:
                # General exception, log this too
                return ""

    async def _fetch_google_rss(self, query: str):
        """Fetches the Google News RSS feed for a given query."""
        params = {"q": query, "hl": "en-IN", "gl": "IN", "ceid": "IN:en"}
        async with httpx.AsyncClient(timeout=15.0, headers=self.HEADERS) as client:
            response = await client.get(self.GOOGLE_RSS_URL, params=params)
            response.raise_for_status()  # Will raise HTTPError for 4xx/5xx
            return response.text

    def _clean_html(self, s: str) -> str:
        """Removes HTML tags and cleans up whitespace."""
        if not s:
            return ""
        s = html.unescape(s)
        s = re.sub(r"<.*?>", "", s)  # Strip HTML tags
        s = re.sub(r"\s+", " ", s).strip()  # Normalize whitespace
        return s

    def _parse_rss_to_json(self, xml_text: str, feed_title: str):
        """Parses RSS XML string into a structured JSON-compatible dictionary."""
        try:
            root = ET.fromstring(xml_text)
            channel = root.find("channel") or root
            
            metadata = {
                "feed_title": feed_title or self._clean_html(channel.findtext("title") or ""),
                "feed_link": channel.findtext("link") or "",
                "description": self._clean_html(channel.findtext("description") or ""),
                "lastBuildDate": channel.findtext("lastBuildDate") or datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S GMT")
            }
            
            items = []
            for item in channel.findall("item")[:5]:
                title_text = self._clean_html(item.findtext("title") or "")
                
                # Clean the full description first
                full_description_text = self._clean_html(item.findtext("description") or "")
                
                final_description = full_description_text
                
                # If description starts with the title, remove the title part to avoid redundancy
                if final_description.lower().startswith(title_text.lower()):
                    final_description = final_description[len(title_text):].lstrip(' -–—') # Also strip em/en dashes
                
                items.append({
                    "title": title_text,
                    "link": (item.findtext("link") or "").strip(),
                    "pubDate": (item.findtext("pubDate") or "").strip(),
                    "source": self._clean_html(item.findtext("source") or ""),
                })
            return {"meta": metadata, "items": items}
        except ET.ParseError:
            # Log this error in a real app
            raise HTTPException(status_code=500, detail="Failed to parse RSS feed XML.")

    async def get_news(self, lat: float, lon: float):
        """
        Main method to get fishing and coastal news.
        It finds the place from lat/lon, builds a query, fetches, and parses the RSS feed.
        """
        place = await self._reverse_place(lat, lon)
        
        # Improved search query for more relevant, safety-oriented news
        search_terms = ["fishing", "coastal", "maritime", "weather", "cyclone", "tsunami", "coast guard", "flood", "storm", "sea conditions"]
        if place:
            query = f"({ ' OR '.join(search_terms) }) AND \"{place}\""
        else:
            query = f"({ ' OR '.join(search_terms) }) AND \"India\""

        try:
            xml_content = await self._fetch_google_rss(query)
        except httpx.HTTPError as e:
            raise HTTPException(status_code=502, detail=f"Failed to fetch news feed from upstream source: {e}")

        feed_display_title = f"{place} Area News" if place else "India Coastal & Fishing News"
        data = self._parse_rss_to_json(xml_content, feed_title=feed_display_title)
        return data
