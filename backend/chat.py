
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List
from mistralai import Mistral
from mistralai.models import SystemMessage, UserMessage, AssistantMessage
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# It's recommended to have the required libraries installed:
# pip install fastapi uvicorn python-dotenv "mistralai>=1.0.0"

app = FastAPI()

# Pydantic model for a single message in the conversation
class Message(BaseModel):
    role: str
    content: str

# Pydantic model for the request body, accepts a list of messages for history
class ChatRequest(BaseModel):
    history: List[Message] = Field(..., description="The conversation history for memory.")

@app.post("/chat")
async def chat_with_expert(request: ChatRequest):
    """
    A simple, non-streaming chat endpoint that receives conversation history.
    """
    api_key = os.getenv("MISTRAL_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="MISTRAL_API_KEY not set in environment.")

    client = Mistral(api_key=api_key)

    system_prompt = "You are a world-class fishing expert. You know everything about fishing techniques, gear, locations, and fish species. Provide helpful and concise tips and tricks. Give responses in under 50 words."

    # Construct the list of messages for the API call, including history
    messages = [SystemMessage(content=system_prompt)]
    for msg in request.history:
        if msg.role == 'user':
            messages.append(UserMessage(content=msg.content))
        elif msg.role == 'assistant':
            messages.append(AssistantMessage(content=msg.content))

    try:
        # Using the .chat.complete_async() method from the new sample
        chat_response = await client.chat.complete_async(
            model="mistral-saba-latest",
            messages=messages,
        )
        
        response_content = chat_response.choices[0].message.content
        return {"response": response_content}

    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
