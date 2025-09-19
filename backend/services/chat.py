import os
from mistralai import Mistral
from mistralai.models import SystemMessage, UserMessage, AssistantMessage
from dotenv import load_dotenv
from models.chat import ChatRequest

load_dotenv()

class ChatService:
    def __init__(self):
        self.api_key = os.getenv("MISTRAL_API_KEY")
        if not self.api_key:
            raise ValueError("MISTRAL_API_KEY not set in environment.")
        self.client = Mistral(api_key=self.api_key)

    async def get_chat_response(self, request: ChatRequest):
        system_prompt = "You are a world-class fishing expert. You know everything about fishing techniques, gear, locations, and fish species. Provide helpful and concise tips and tricks. Give responses in under 50 words."

        messages = [SystemMessage(content=system_prompt)]
        for msg in request.history:
            if msg.role == 'user':
                messages.append(UserMessage(content=msg.content))
            elif msg.role == 'assistant':
                messages.append(AssistantMessage(content=msg.content))

        try:
            chat_response = await self.client.chat.complete_async(
                model="mistral-saba-latest",
                messages=messages,
            )
            
            return {"response": chat_response.choices[0].message.content}

        except Exception as e:
            print(f"Error: {str(e)}")
            raise
