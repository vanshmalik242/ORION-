from fastapi.security import OAuth2PasswordRequestForm
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from auth import authenticate_user, create_access_token
from jose import jwt
import sqlite3
from auth import SECRET_KEY
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.get("/")
def home():
    return {"message": "IDS System Running 🚀"}

@app.get("/api/v1/alerts")
def external_alerts(user=Depends(get_current_user)):
    return get_alerts()


@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({
        "sub": user["username"],
        "role": user["role"]
    })

    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/admin-only")
def admin_route(user=Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    return {"message": "Welcome Admin"}


import os
DB_PATH = os.path.join(os.path.dirname(__file__), 'alerts.db')

@app.get("/heatmap")
def heatmap_data():
    # Mocking heatmap data because alerts table lacks latitude/longitude columns
    import random
    points = []
    for _ in range(50):
        points.append({
            "lat": random.uniform(-60, 60),
            "lon": random.uniform(-150, 150)
        })

    return {"heatmap": points}


@app.get("/alerts")
def get_alerts():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT id, src_ip, severity, timestamp FROM alerts ORDER BY id DESC LIMIT 50")
        rows = cursor.fetchall()
    except sqlite3.OperationalError:
        rows = []
    finally:
        conn.close()

    alerts = []
    for row in rows:
        alerts.append({
            "id": row[0],
            "source_ip": row[1],
            "severity": row[2],
            "timestamp": row[3],
            "type": "Anomaly Detected",
            "latitude": None,
            "longitude": None
        })

    return {"alerts": alerts}
