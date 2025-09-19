# sms_sender.py
import os
from twilio.rest import Client
from dotenv import load_dotenv

# Load environment variables from .env (if present)
load_dotenv()

# Twilio credentials (store them in .env instead of hardcoding)
account_sid = os.getenv("TWILIO_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
twilio_phone = os.getenv("TWILIO_PHONE")

client = Client(account_sid, auth_token)

def send_sms(to: str, body: str):
    message = client.messages.create(
        body=body,
        from_=twilio_phone,
        to=to
    )
    return message.sid




from fastapi import FastAPI
from pydantic import BaseModel
from sms_sender import send_sms

app = FastAPI()

class SOSRequest(BaseModel):
    to_number: str
    message: str
    latitude: float
    longitude: float

@app.post("/sos")
def trigger_sos(req: SOSRequest):
    try:
        # Format message to include location
        full_message = (
            f"{req.message}\n"
            f"📍 Location: https://maps.google.com/?q={req.latitude},{req.longitude}"
        )

        sid = send_sms(req.to_number, full_message)
        return {"status": "success", "sid": sid}
    except Exception as e:
        return {"status": "error", "details": str(e)}

