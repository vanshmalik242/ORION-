import sqlite3
from datetime import datetime

conn = sqlite3.connect("alerts.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS alerts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    severity TEXT,
    timestamp TEXT
)
""")

def save_alert(alert):
    cursor.execute(
        "INSERT INTO alerts(type, severity, timestamp) VALUES (?, ?, ?)",
        (alert["type"], alert["severity"], datetime.now())
    )
    conn.commit()