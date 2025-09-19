
from dotenv import load_dotenv
import os
import logging
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
from services.chat import ChatService
from models.alert import AlertResponse
from models.authentication import Phone, Otp
from models.chat import ChatRequest
from pydantic import BaseModel
from fastapi import Request
from fastapi.responses import JSONResponse
from services.rss_service import RssService

# --- FastAPI Setup ---
app = FastAPI(
    title="SeaGuard API",
    description="Accurate Fishing Alerts with Probability & Day/Night Detection",
    version="3.2.0"
)


alerts = IndiaFishingAlerts()
rss_service = RssService()
# auth_service = AuthService()
chat_service = ChatService()

@app.get("/")
def root():
    return {"message": "Welcome to SeaGuard. Use /docs for API details."}

@app.post("/chat")
async def chat_with_expert(request: ChatRequest):
    try:
        return await chat_service.get_chat_response(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/fishing-alert", response_model=AlertResponse)
def fishing_alert(lat: float, lon: float):
    result = alerts.get_alerts(lat, lon)
    if "ERROR" in result["status"]:
        raise HTTPException(status_code=503, detail=result["message"])
    return result

@app.get("/rss-feed")
async def rss_feed(lat: float, lon: float):
    """
    Provides a JSON feed of recent fishing and coastal news for a given location.
    """
    try:
        news_data = await rss_service.get_news(lat, lon)
        return JSONResponse(content=news_data)
    except HTTPException as e:
        # Re-raise HTTPExceptions thrown from the service
        raise e
    except Exception as e:
        # Catch any other unexpected errors
        logging.error(f"Error in rss_feed endpoint: {e}")
        raise HTTPException(status_code=500, detail="An internal error occurred while fetching the news feed.")

# @app.post("/send-otp")
# async def send_otp(request: Request):
#     request = await request.json()
#     phone = request["phoneNumber"]
#     result = auth_service.send_otp(phone)
#     if "error" in result:
#         raise HTTPException(status_code=400, detail=result["error"])
#     return result

# @app.post("/verify-otp")
# async def verify_otp(request: Request):
#     request = await request.json()
#     otp = request["otp"]
#     phone = request["phoneNumber"]
#     result = auth_service.verify_otp(phone, otp)
#     if "error" in result:
#         raise HTTPException(status_code=400, detail=result["error"])
#     return result
