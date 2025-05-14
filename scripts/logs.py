import requests
from datetime import datetime, timedelta
import time

API_KEY = "rnd_uvM9omL2h5YdGkUOxVCxQVFMyUqp"
SERVICE_ID = "srv-crhqbcbtq21c73819pd0"

def get_owner_id_from_service(service_id):
    url = f"https://api.render.com/v1/services/{service_id}"
    headers = {
        "accept": "application/json",
        "authorization": f"Bearer {API_KEY}"
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()["ownerId"]

def iso8601(dt: datetime) -> str:
    return dt.isoformat() + "Z"

def fetch_logs(service_id, owner_id, start, end, direction="forward", limit=100):
    url = "https://api.render.com/v1/logs"
    headers = {
        "accept": "application/json",
        "authorization": f"Bearer {API_KEY}"
    }
    params = {
        "ownerId": owner_id,
        "resource": [service_id],
        "startTime": start,
        "endTime": end,
        "direction": direction,
        "limit": limit
    }
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    return response.json()

def download_logs(service_id, owner_id, start: datetime, end: datetime):
    current_start = iso8601(start)
    current_end = iso8601(end)
    all_logs = []

    filename = f"render_logs_{start.strftime('%Y-%m-%d')}_to_{end.strftime('%Y-%m-%d')}.txt"

    while True:
        print(f"Fetching logs: {current_start} to {current_end}")
        try:
            data = fetch_logs(service_id, owner_id, current_start, current_end)
        except requests.exceptions.RequestException as e:
            print(f"Error fetching logs: {e}")
            break

        logs = data.get("logs", [])
        for log in logs:
            timestamp = log["timestamp"]
            message = log["message"]
            all_logs.append(f"{timestamp}  {message}")

        if data.get("hasMore"):
            current_start = data["nextStartTime"]
            current_end = data["nextEndTime"]
            time.sleep(0.1)
        else:
            break

    with open(filename, "w", encoding="utf-8") as f:
        f.write("\n".join(all_logs))

    print(f"✅ Logs saved to {filename}")

if __name__ == "__main__":
    OWNER_ID = get_owner_id_from_service(SERVICE_ID)
    end_time = datetime.utcnow()
    start_time = end_time - timedelta(days=7)

    download_logs(SERVICE_ID, OWNER_ID, start=start_time, end=end_time)
