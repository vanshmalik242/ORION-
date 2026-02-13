import joblib
import numpy as np

model = joblib.load("model.pkl")

def check_anomaly(features):
    data = np.array(features).reshape(1, -1)
    prediction = model.predict(data)

    if prediction[0] == 1:
        return {
            "type": "Anomaly Detected",
            "severity": "High"
        }
    return None