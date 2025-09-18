import requests
import json
import os

def fetch_and_save_boundaries():
    """
    Fetches Indian maritime boundary data from geo.vliz.be and saves it
    to a local GeoJSON file.
    """
    url = "https://geo.vliz.be/geoserver/wfs?request=getfeature&service=wfs&version=1.1.0&typename=MarineRegions:eez&filter=%3CFilter%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Emrgid_eez%3C/PropertyName%3E%3CLiteral%3E8480%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3C/Filter%3E&outputFormat=application/json"
    
    try:
        print("Fetching maritime boundaries data...")
        response = requests.get(url, timeout=30)
        response.raise_for_status()  # Raise an exception for bad status codes (4xx or 5xx)
        data = response.json()
        
        # Get the directory where the script is located
        script_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(script_dir, 'boundary.json')
        
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=2)
            
        print(f"Successfully fetched and saved maritime boundaries to {file_path}")

    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
    except json.JSONDecodeError:
        print("Error: Failed to decode JSON from the response. The data may not be in the expected format.")
    except IOError as e:
        print(f"Error writing to file: {e}")

if __name__ == "__main__":
    fetch_and_save_boundaries()
