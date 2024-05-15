import time
import schedule
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import requests
import json

url = "https://figjam-widgets.onrender.com/messages"




# Define the database and collection for testing
DATABASE = 'test'
COLLECTION = 'messages'

# Function to keep MongoDB server alive
def keep_mongo_alive():
    try:
        # message contents
        new_message_object = {
            "KeepAlive": "keepDBAlive"
        }
        # convert to json
        data = json.dumps(new_message_object)
        # Headers
        headers = {
            'Content-Type': 'application/json'
        }
        # Making the POST request
        response = requests.post(url, headers=headers, data=data)
        # Printing the response
        print(response.status_code)

    except Exception as e:
        print(f"Error pinging MongoDB server: {e}")

# Schedule the keep-alive functions to run every x minutes
schedule.every(0.1).minutes.do(keep_mongo_alive)

# Run the keep-alive job periodically
if __name__ == "__main__":
    keep_mongo_alive()  # Initial call to ensure immediate ping
    while True:
        schedule.run_pending()
        time.sleep(1)