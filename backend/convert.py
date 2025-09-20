import requests
import json
import time

# Your Sarvam API Key
API_KEY = "sk_f9x0xata_kc6bCG9hLzrmCXwx9lS83m30"

# Target languages
languages = ["hi-IN", "ta-IN", "te-IN", "ml-IN", "bn-IN", "fr-FR", "es-ES"]

# Base English texts
screenTexts = {
  "HomeScreen": {
    "en": {
      "title": "Home",
      "welcome": "Welcome to SeaGuard!",
      "location": {
        "permissionDenied": "Permission to access location was denied",
        "loading": "Loading location...",
        "coordinateFormat": "°N, °E"
      },
      "weather": {
        "descriptions": {
          "0": "Clear sky",
          "1": "Mainly clear",
          "2": "Partly cloudy",
          "3": "Overcast",
          "45": "Fog",
          "48": "Depositing rime fog",
          "51": "Light drizzle",
          "53": "Moderate drizzle",
          "55": "Dense drizzle",
          "56": "Light freezing drizzle",
          "57": "Dense freezing drizzle",
          "61": "Slight rain",
          "63": "Moderate rain",
          "65": "Heavy rain",
          "66": "Light freezing rain",
          "67": "Heavy freezing rain",
          "71": "Slight snow fall",
          "73": "Moderate snow fall",
          "75": "Heavy snow fall",
          "77": "Snow grains",
          "80": "Slight rain showers",
          "81": "Moderate rain showers",
          "82": "Violent rain showers",
          "85": "Slight snow showers",
          "86": "Heavy snow showers",
          "95": "Thunderstorm",
          "96": "Thunderstorm with slight hail",
          "99": "Thunderstorm with heavy hail"
        }
      },
      "fishingConditions": {
        "loading": "Loading...",
        "unknown": "Unknown"
      },
      "errors": {
        "networkError": "Network response was not ok.",
        "fetchError": "Failed to fetch fishing alert: "
      }
    }
  },
  "ChatScreen": {
    "en": {
      "title": "Chat",
      "send": "Send",
      "placeholder": "Type your message...",
      "initialBotMessage": "Hello! I am SeaBot, your AI assistant. How can I help you today?",
      "errorMessages": {
        "connection": "Sorry, I am having trouble connecting. Please try again later.",
        "micPermission": "Permission to access microphone is required!"
      },
      "recording": {
        "start": "Start Recording",
        "stop": "Stop Recording"
      }
    }
  },
  "LoginScreen": {
    "en": {
      "title": "Login",
      "welcome": "Welcome user!\nGlad to see you again!",
      "phoneNumber": {
        "label": "Phone Number",
        "placeholder": "Enter your phone number"
      },
      "otp": {
        "label": "OTP",
        "placeholder": "Enter OTP",
        "sendButton": "Send OTP",
        "verifyButton": "Verify OTP",
        "sentSuccess": "OTP sent successfully",
        "verifyError": "Failed to verify OTP"
      },
      "errors": {
        "general": "An unexpected error occurred. Please try again.",
        "sendOtp": "Failed to send OTP"
      }
    }
  },
  "AboutScreen": {
    "en": {
      "title": "About",
      "version": "Version",
      "description": "SeaGuard is your maritime safety companion"
    }
  },
  "BaitSelection": {
    "en": {
      "title": "Bait Selection",
      "selectPrompt": "Select your bait type"
    }
  },
  "CatchRecordScreen": {
    "en": {
      "title": "Catch Record",
      "addNew": "Add New Catch",
      "history": "Catch History"
    }
  },
  "CompassScreen": {
    "en": {
      "title": "Compass",
      "north": "N",
      "south": "S",
      "east": "E",
      "west": "W"
    }
  },
  "DisasterAlertScreen": {
    "en": {
      "title": "Disaster Alerts",
      "noAlerts": "No active alerts",
      "checkStatus": "Check Alert Status"
    }
  },
  "EditProfileScreen": {
    "en": {
      "title": "Edit Profile",
      "save": "Save Changes",
      "cancel": "Cancel",
      "fields": {
        "name": "Name",
        "phone": "Phone Number",
        "vessel": "Vessel Name"
      }
    }
  },
  "FeaturesScreen": {
    "en": {
      "title": "Features",
      "availableFeatures": "Available Features"
    }
  },
  "FishingGears": {
    "en": {
      "title": "Fishing Gears",
      "selectGear": "Select Gear Type"
    }
  },
  "GpsNavigationScreen": {
    "en": {
      "title": "GPS Navigation",
      "startNavigation": "Start Navigation",
      "endNavigation": "End Navigation",
      "recenter": "Recenter Map"
    }
  },
  "HeatmapScreen": {
    "en": {
      "title": "Fishing Heatmap",
      "legend": "Activity Intensity",
      "timeRange": "Select Time Range"
    }
  },
  "NewsScreen": {
    "en": {
      "title": "News",
      "latestNews": "Latest News",
      "readMore": "Read More"
    }
  },
  "NoFishingZoneScreen": {
    "en": {
      "title": "No Fishing Zones",
      "warning": "Warning: You are approaching a no-fishing zone",
      "distance": "Distance to zone boundary"
    }
  },
  "SOSScreen": {
    "en": {
      "title": "Emergency SOS",
      "sendSOS": "Send SOS Signal",
      "emergency": "EMERGENCY",
      "cancelSOS": "Cancel SOS",
      "help": "Help is on the way"
    }
  },
  "SettingsScreen": {
    "en": {
      "title": "Settings",
      "language": "Language",
      "notifications": "Notifications",
      "darkMode": "Dark Mode",
      "about": "About",
      "logout": "Logout"
    }
  },
  "ProfileScreen": {
    "en": {
      "title": "Profile",
      "edit": "Edit Profile",
      "logout": "Logout",
      "stats": "Fishing Stats",
      "settings": "Settings",
      "history": "Trip History"
    }
  },
  "FishingNetsGuide": {
    "en": {
      "title": "Fishing Nets Guide",
      "categories": {
        "gillNets": "Gill Nets",
        "seineNets": "Seine Nets",
        "trawlNets": "Trawl Nets",
        "castNets": "Cast Nets"
      },
      "details": {
        "specifications": "Specifications",
        "usage": "Usage Guidelines",
        "maintenance": "Maintenance Tips"
      },
      "selectPrompt": "Select a net type to learn more"
    }
  },
  "FishingOptimizationHub": {
    "en": {
      "title": "Fishing Optimization",
      "sections": {
        "weather": "Weather Conditions",
        "fishingZones": "Potential Fishing Zones",
        "seasonalTips": "Seasonal Tips",
        "equipment": "Equipment Recommendations"
      },
      "analytics": {
        "catchRate": "Catch Rate Analysis",
        "bestTimes": "Best Fishing Times",
        "tideInfo": "Tide Information"
      },
      "insights": "Fishing Insights"
    }
  },
  "IBLAlertsScreen": {
    "en": {
      "title": "IBL Alerts",
      "warnings": {
        "boundary": "International Boundary Line Warning",
        "approaching": "Approaching IBL",
        "distance": "Distance to IBL"
      },
      "alerts": {
        "high": "High Risk Area",
        "medium": "Medium Risk Area",
        "low": "Safe Zone"
      },
      "actions": {
        "acknowledge": "Acknowledge Alert",
        "navigate": "Navigate to Safe Zone",
        "emergency": "Emergency Contact"
      }
    }
  },
  "ImportantContactsScreen": {
    "en": {
      "title": "Important Contacts",
      "categories": {
        "emergency": "Emergency Contacts",
        "coastGuard": "Coast Guard",
        "ports": "Port Authorities",
        "weather": "Weather Services"
      },
      "actions": {
        "call": "Call",
        "message": "Send Message",
        "save": "Save Contact"
      },
      "labels": {
        "name": "Name",
        "number": "Phone Number",
        "description": "Description"
      }
    }
  },
  "LogNewCatchScreen": {
    "en": {
      "title": "Log New Catch",
      "form": {
        "species": "Fish Species",
        "weight": "Weight (kg)",
        "quantity": "Quantity",
        "location": "Catch Location",
        "time": "Time of Catch",
        "method": "Fishing Method"
      },
      "buttons": {
        "add": "Add Catch",
        "photo": "Add Photo",
        "save": "Save Log",
        "cancel": "Cancel"
      },
      "messages": {
        "success": "Catch logged successfully",
        "error": "Error logging catch"
      }
    }
  },
  "Maps": {
    "en": {
      "title": "Maps",
      "layers": {
        "satellite": "Satellite View",
        "terrain": "Terrain View",
        "weather": "Weather Layer",
        "fishing": "Fishing Zones"
      },
      "controls": {
        "zoom": "Zoom",
        "recenter": "Recenter",
        "track": "Track Location"
      },
      "markers": {
        "current": "Current Location",
        "destination": "Destination",
        "warning": "Warning Zone"
      }
    }
  },
  "OnboardingScreen": {
    "en": {
      "title": "Welcome to SeaGuard",
      "slides": {
        "safety": {
          "title": "Safety First",
          "description": "Your maritime safety companion"
        },
        "features": {
          "title": "Smart Features",
          "description": "Everything you need for safe fishing"
        },
        "community": {
          "title": "Join the Community",
          "description": "Connect with fellow fishermen"
        }
      },
      "buttons": {
        "next": "Next",
        "skip": "Skip",
        "getStarted": "Get Started"
      }
    }
  },
  "OtherServicesScreen": {
    "en": {
      "title": "Other Services",
      "services": {
        "insurance": "Insurance Services",
        "maintenance": "Boat Maintenance",
        "training": "Safety Training",
        "market": "Market Prices"
      },
      "actions": {
        "book": "Book Service",
        "inquire": "Make Inquiry",
        "contact": "Contact Provider"
      }
    }
  },
  "PotentialFishingZoneScreen": {
    "en": {
      "title": "Potential Fishing Zones",
      "indicators": {
        "high": "High Potential",
        "medium": "Medium Potential",
        "low": "Low Potential"
      },
      "data": {
        "temperature": "Water Temperature",
        "chlorophyll": "Chlorophyll Levels",
        "currentSpeed": "Current Speed"
      },
      "updates": {
        "latest": "Latest Update",
        "next": "Next Update"
      }
    }
  },
  "PurposeOnboardingScreen": {
    "en": {
      "title": "Select Your Purpose",
      "options": {
        "fishing": "Commercial Fishing",
        "recreational": "Recreational Fishing",
        "research": "Marine Research",
        "transport": "Maritime Transport"
      },
      "prompts": {
        "select": "Select your primary activity",
        "customize": "We'll customize your experience"
      },
      "buttons": {
        "confirm": "Confirm Selection",
        "back": "Go Back"
      }
    }
  },
  "SeaSafetyLivelihoodScreen": {
    "en": {
      "title": "Sea Safety & Livelihood",
      "sections": {
        "safety": {
          "title": "Safety Guidelines",
          "equipment": "Safety Equipment",
          "procedures": "Emergency Procedures"
        },
        "livelihood": {
          "title": "Livelihood Resources",
          "schemes": "Government Schemes",
          "training": "Skill Development"
        }
      },
      "resources": {
        "download": "Download Guide",
        "helpline": "Safety Helpline",
        "register": "Register for Training"
      }
    }
  },
  "TrackerScreen": {
    "en": {
      "title": "Vessel Tracker",
      "status": {
        "active": "Active Tracking",
        "paused": "Tracking Paused",
        "offline": "Offline"
      },
      "data": {
        "speed": "Current Speed",
        "heading": "Heading",
        "distance": "Distance Traveled"
      },
      "controls": {
        "start": "Start Tracking",
        "pause": "Pause Tracking",
        "stop": "Stop Tracking",
        "share": "Share Location"
      }
    }
  },
  "TripPlanningScreen": {
    "en": {
      "title": "Trip Planning",
      "form": {
        "departure": "Departure Point",
        "destination": "Destination",
        "date": "Departure Date",
        "duration": "Trip Duration",
        "crew": "Crew Size"
      },
      "weather": {
        "forecast": "Weather Forecast",
        "tides": "Tide Schedule",
        "warnings": "Weather Warnings"
      },
      "checklist": {
        "safety": "Safety Equipment",
        "supplies": "Supplies",
        "documents": "Required Documents"
      },
      "buttons": {
        "plan": "Create Plan",
        "save": "Save Plan",
        "share": "Share Plan"
      }
    }
  }
}


def translate_text(text, target_lang):
    """Translate text using Sarvam API"""
    if not text or text.strip() == "":
        return text
    
    url = "https://api.sarvam.ai/translate"
    headers = {
        "api-subscription-key": API_KEY,
        "Content-Type": "application/json"
    }
    
    payload = {
        "input": text,
        "source_language_code": "en-IN",
        "target_language_code": target_lang
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            return result.get("translated_text", text)
        else:
            print(f"❌ API Error ({response.status_code}) for '{text}' → {target_lang}")
            print(f"   Response: {response.text}")
            return text
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Network Error for '{text}': {e}")
        return text

def translate_dict(data, target_lang):
    """Recursively translate dictionary values"""
    if isinstance(data, dict):
        result = {}
        for key, value in data.items():
            result[key] = translate_dict(value, target_lang)
        return result
    elif isinstance(data, str):
        translated = translate_text(data, target_lang)
        time.sleep(0.3)  # Delay to avoid rate limiting
        return translated
    else:
        return data

def main():
    """Main translation process"""
    if API_KEY == "YOUR_SARVAM_API_KEY":
        print("❌ Please replace 'YOUR_SARVAM_API_KEY' with your actual API key!")
        return
    
    print("🚀 Starting translations...")
    
    # Test API connection first
    test_response = translate_text("Hello", "hi-IN")
    if test_response == "Hello":
        print("❌ API test failed. Please check your API key and internet connection.")
        return
    else:
        print(f"✅ API test successful: 'Hello' → '{test_response}'")
    
    # Process each screen
    for screen_name in screenTexts.keys():
        print(f"\n📱 Processing {screen_name}...")
        
        for lang in languages:
            lang_code = lang.split('-')[0]  # Extract language code (hi, ta, etc.)
            print(f"  🌍 Translating to {lang_code.upper()}...")
            
            try:
                screenTexts[screen_name][lang_code] = translate_dict(
                    screenTexts[screen_name]["en"], 
                    lang
                )
                print(f"  ✅ {lang_code.upper()} completed")
                
            except Exception as e:
                print(f"  ❌ Failed for {lang_code.upper()}: {e}")
    
    # Save results
    try:
        with open("multilingual_screenTexts.json", "w", encoding="utf-8") as f:
            json.dump(screenTexts, f, ensure_ascii=False, indent=2)
        print("\n✅ All translations saved to multilingual_screenTexts.json")
        
        # Show sample translations
        print("\n📄 Sample translations:")
        for screen in screenTexts:
            if "hi" in screenTexts[screen]:
                print(f"  {screen} title in Hindi: {screenTexts[screen]['hi'].get('title', 'N/A')}")
        
    except Exception as e:
        print(f"❌ Failed to save file: {e}")

if __name__ == "__main__":
    main()