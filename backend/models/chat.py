from pydantic import BaseModel, Field
from typing import List

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    history: List[Message] = Field(..., description="The conversation history for memory.")
