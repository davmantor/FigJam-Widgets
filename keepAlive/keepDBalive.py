import time
import schedule
from datetime import datetime
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://keepAlive:BdELkiIYGDV2LZCo@init-cluster.plnn1mm.mongodb.net/?retryWrites=true&w=majority&appName=init-cluster"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Define the database and collection for testing
DATABASE = 'test'
COLLECTION = 'logs'

# Function to keep MongoDB server alive
def keep_mongo_alive():
    try:
        client.admin.command('ping')
        now = datetime.now().strftime("%Y-%m-%d %I:%M:%S %p")
        print(f"Pinged your deployment at {now}. You successfully connected to MongoDB!")

        # Access the test database and collection
        db = client[DATABASE]
        collection = db[COLLECTION]

        # Execute a simple query like counting documents
        count = collection.count_documents({})
        print(f"Document count in {COLLECTION}: {count}")
    except Exception as e:
        print(f"Error pinging MongoDB server: {e}")

# Schedule the keep-alive functions to run every x minutes
schedule.every(18).minutes.do(keep_mongo_alive)

# Run the keep-alive job periodically
if __name__ == "__main__":
    keep_mongo_alive()  # Initial call to ensure immediate ping
    while True:
        schedule.run_pending()
        time.sleep(1)