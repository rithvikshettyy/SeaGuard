

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

from fastapi import FastAPI, HTTPException, File, UploadFile
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
import httpx

import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import io

# Fish class names from the Kaggle notebook
CLASS_NAMES = [
    'Bangus', 'Big Head Carp', 'Black Spotted Barb', 'Catfish', 'Climbing Perch', 
    'Fourfinger Threadfin', 'Freshwater Eel', 'Glass Perchlet', 'Goby', 'Gold Fish', 
    'Gourami', 'Grass Carp', 'Green Spotted Puffer', 'Indian Carp', 'Indo-Pacific Tarpon', 
    'Jaguar Gapote', 'Janitor Fish', 'Knifefish', 'Long-Snouted Pipefish', 'Mosquito Fish', 
    'Mudfish', 'Mullet', 'Pangasius', 'Perch', 'Scat Fish', 'Silver Barb', 'Silver Carp',
    'Silver Perch', 'Snakehead', 'Tenpounder', 'Tilapia'
]

# Load model
model = load_model('FishModelClassifier_V5.h5', compile=False)

def preprocess_image(image: Image.Image):
    """Preprocess image same as training code"""
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    image = image.resize((224, 224))
    img_array = np.array(image) / 255.0
    return np.expand_dims(img_array, 0)

# --- FastAPI Setup ---
app = FastAPI(
    title="SeaGuard API",
    description="Accurate Fishing Alerts with Probability & Day/Night Detection",
    version="3.2.0"
)


alerts: IndiaFishingAlerts = None
rss_service = RssService()
# auth_service = AuthService()
chat_service = ChatService()

@app.on_event("startup")
async def startup_event():
    app.state.httpx_client = httpx.AsyncClient(timeout=8)
    global alerts
    alerts = IndiaFishingAlerts(app.state.httpx_client)

@app.on_event("shutdown")
async def shutdown_event():
    await app.state.httpx_client.aclose()

@app.get("/")
def root():
    return {"message": "Welcome to SeaGuard. Use /docs for API details."}

@app.get("/fish-classify")
async def fish_classify_root():
    return {"message": "Fish Classification API", "species_count": len(CLASS_NAMES)}

@app.post("/fish-classify/predict")
async def predict_fish(file: UploadFile = File(...)):
    """Predict fish species from image"""
    
    if not file.content_type.startswith('image/'):
        raise HTTPException(400, "File must be an image")
    
    try:
        # Read and preprocess image
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes))
        img_array = preprocess_image(image)
        
        # Predict
        predictions = model.predict(img_array)
        
        # Get top 5 predictions
        top_indices = np.argsort(predictions[0])[::-1][:5]
        results = []
        
        for i, idx in enumerate(top_indices):
            results.append({
                "species": CLASS_NAMES[idx],
                "confidence": f"{float(predictions[0][idx]) * 100:.2f}%"
            })
        
        return {
            "predicted_species": CLASS_NAMES[np.argmax(predictions[0])],
            "top_predictions": results
        }
        
    except Exception as e:
        raise HTTPException(500, f"Prediction error: {str(e)}")

@app.post("/chat")
async def chat_with_expert(request: ChatRequest):
    try:
        return await chat_service.get_chat_response(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/fishing-alert", response_model=AlertResponse)
async def fishing_alert(lat: float, lon: float):
    result = await alerts.get_alerts(lat, lon)
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

if __name__ == "__main__":
    import uvicorn
    from pyngrok import ngrok
    port = 8000
    ngrok_auth_token = os.getenv("NGROK_AUTH_TOKEN")
    if ngrok_auth_token:
        ngrok.set_auth_token(ngrok_auth_token)
    else:
        print("NGROK_AUTH_TOKEN not found in .env file. Tunneling without authentication.")
    
    try:
        public_url = ngrok.connect(port)
        print(f"Public URL: {public_url}")
    except Exception as e:
        print(f"Error connecting to ngrok: {e}")
        print("Please ensure your NGROK_AUTH_TOKEN is correctly set in the .env file and that ngrok is able to connect.")
    
    uvicorn.run(app, port=port)

