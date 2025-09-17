
from dotenv import load_dotenv
import os

# Explicitly provide the path to the .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=dotenv_path)

"""
SeaGuard: Indian Coastal Fishing Alerts API
FastAPI service delivering probability-based fishing safety alerts
with accurate day/night detection and clean response.
"""

from fastapi import FastAPI, HTTPException
from services.fishing_alerts import IndiaFishingAlerts
from services.authentication import AuthService
from models.alert import AlertResponse
from models.authentication import Phone, Otp

# --- FastAPI Setup ---
app = FastAPI(
    title="SeaGuard API",
    description="Accurate Fishing Alerts with Probability & Day/Night Detection",
    version="3.2.0"
)

alerts = IndiaFishingAlerts()
auth_service = AuthService()

@app.get("/")
def root():
    return {"message": "Welcome to SeaGuard. Use /docs for API details."}

@app.get("/fishing-alert", response_model=AlertResponse)
def fishing_alert(lat: float, lon: float):
    result = alerts.get_alerts(lat, lon)
    if "ERROR" in result["status"]:
        raise HTTPException(status_code=503, detail=result["message"])
    return result

@app.post("/send-otp")
def send_otp(phone: Phone):
    result = auth_service.send_otp(phone.phone_number)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@app.post("/verify-otp")
def verify_otp(otp: Otp):
    result = auth_service.verify_otp(otp.phone_number, otp.otp)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result
