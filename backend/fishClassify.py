from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import io
import uvicorn

app = FastAPI(title="Fish Classification API")

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

@app.post("/predict")
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

@app.get("/")
async def root():
    return {"message": "Fish Classification API", "species_count": len(CLASS_NAMES)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)