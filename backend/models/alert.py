
from pydantic import BaseModel
from typing import Dict, Any

class AlertResponse(BaseModel):
    safe: bool
    status: str
    message: str
    advice: str
    risk_probability: float
    location: str
    time: str
    time_of_day: str
    data: Dict[str, Any]
