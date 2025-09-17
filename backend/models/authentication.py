
from pydantic import BaseModel

class Phone(BaseModel):
    phone_number: str

class Otp(BaseModel):
    phone_number: str
    otp: str
