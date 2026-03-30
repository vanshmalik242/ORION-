import pandas as pd
import joblib

# Load trained model
model = joblib.load("model.pkl")


def check_anomaly(features):
    try:
        # ✅ Convert dict → DataFrame (CRITICAL)
        df = pd.DataFrame([features])

        prediction = model.predict(df)[0]

        if prediction == 1:
            return {
                "type": "Intrusion Detected 🚨",
                "severity": "High"
            }
        else:
            return None

    except Exception as e:
        print("Prediction Error:", e)
        return None
