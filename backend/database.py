import sqlite3
from datetime import datetime

def init_db():
    conn = sqlite3.connect("alerts.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS alerts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        src_ip TEXT,
        severity TEXT,
        timestamp TEXT
    )
    """)

    conn.commit()
    conn.close()


def save_alert(alert, src_ip):
    conn = sqlite3.connect("alerts.db")
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO alerts (src_ip, severity, timestamp) VALUES (?, ?, ?)",
        (
            src_ip,
            alert["severity"],
            datetime.now().strftime("%H:%M:%S")
        )
    )

    conn.commit()
    conn.close()