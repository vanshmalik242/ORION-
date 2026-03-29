from fastapi import FastAPI
import sqlite3
from packet_sniffer import start_sniffing
import threading

app = FastAPI()

# Start packet sniffer in background
threading.Thread(target=start_sniffing, daemon=True).start()

@app.get("/alerts")
def get_alerts():
    conn = sqlite3.connect("alerts.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM alerts ORDER BY id DESC")
    rows = cursor.fetchall()
    return {"alerts": rows}
@app.get("/")
def home():
    return {"message": "IDS System Running 🚀"}
