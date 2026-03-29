import sqlite3
from datetime import datetime
from geo_engine import get_location

conn = sqlite3.connect("alerts.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""

CREATE TABLE IF NOT EXISTS alerts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    severity TEXT,
    timestamp TEXT,
    source_ip TEXT,
    latitude REAL,
    longitude REAL
)
""")


def save_alert(alert, src_ip):
    location = get_location(src_ip)

    latitude = None
    longitude = None

    if location:
        latitude = location["lat"]
        longitude = location["lon"]

    cursor.execute(
        """INSERT INTO alerts(type, severity, timestamp, source_ip, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)""",
        (alert["type"], alert["severity"], str(datetime.now()), src_ip,latitude,longitude)
    )
    conn.commit()