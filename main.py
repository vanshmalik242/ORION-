from fastapi.security import OAuth2PasswordRequestForm
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from auth import authenticate_user, create_access_token
from jose import jwt
import sqlite3
from auth import SECRET_KEY
from database import conn, cursor

app= FastAPI()


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


@app.get("/heatmap")
def heatmap_data():
    conn = sqlite3.connect("alerts.db")
    cursor = conn.cursor()
    cursor.execute("SELECT latitude, longitude FROM alerts WHERE latitude IS NOT NULL")
    rows = cursor.fetchall()
    conn.close()

    points = []
    for row in rows:
        points.append({
            "lat": row[0],
            "lon": row[1]
        })

    return {"heatmap": points}


@app.get("/alerts")
def get_alerts():
    conn = sqlite3.connect("alerts.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM alerts ORDER BY id DESC")
    rows = cursor.fetchall()

    alerts = []
    for row in rows:
        alerts.append({
            "id": row[0],
            "type": row[1],
            "severity": row[2],
            "timestamp": row[3],
            "source_ip": row[4],
            "latitude": row[5],
            "longitude": row[6]
        })

    conn.close()
    return {"alerts": alerts}
