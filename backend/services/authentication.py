import os
from supabase import create_client, Client
from twilio.rest import Client as TwilioClient

class AuthService:
    def __init__(self):
        self.supabase_url = os.environ.get("SUPABASE_URL")
        self.supabase_key = os.environ.get("SUPABASE_KEY")
        self.twilio_account_sid = os.environ.get("TWILIO_ACCOUNT_SID")
        self.twilio_auth_token = os.environ.get("TWILIO_AUTH_TOKEN")
        self.twilio_phone_number = os.environ.get("TWILIO_PHONE_NUMBER")
        self.twilio_service_sid = os.environ.get("TWILIO_SERVICE_SID")

        if not all([self.supabase_url, self.supabase_key, self.twilio_account_sid, self.twilio_auth_token, self.twilio_phone_number, self.twilio_service_sid]):
            raise ValueError("One or more environment variables are not set.")

        self.supabase: Client = create_client(self.supabase_url, self.supabase_key)
        self.twilio_client = TwilioClient(self.twilio_account_sid, self.twilio_auth_token)

    def send_otp(self, phone_number: str):
        try:
            verification = self.twilio_client.verify.v2.services(self.twilio_service_sid) \
                .verifications \
                .create(to=phone_number, channel='sms')
            return {"message": f"OTP sent to {phone_number}"}
        except Exception as e:
            return {"error": str(e)}

    def verify_otp(self, phone_number: str, otp: str):
        try:
            verification_check = self.twilio_client.verify.v2.services(self.twilio_service_sid) \
                .verification_checks \
                .create(to=phone_number, code=otp)
            if verification_check.status == 'approved':
                # OTP is correct - for now, just return success without database operations
                return {"message": "OTP verified successfully", "phone_number": phone_number}
                
                # Uncomment below when you have the users table set up in Supabase
                try:
                    user = self.supabase.table('users').select('*').eq('phone_number', phone_number).execute()
                    if not user.data:
                        # User does not exist, create a new user
                        new_user = self.supabase.table('users').insert({'phone_number': phone_number}).execute()
                        return {"message": "User created successfully", "user": new_user.data[0]}
                    return {"message": "User logged in successfully", "user": user.data[0]}
                except Exception as db_error:
                    return {"error": f"Database error: {str(db_error)}"}
            else:
                return {"error": "Invalid OTP"}
            return {"message": "OTP verified successfully"}
        except Exception as e:
            return {"error": str(e)}