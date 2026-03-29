import joblib

model = joblib.load("model.pkl")

def get_feature_importance():
    return model.feature_importances_.tolist()

def check_anomaly(features):
    prediction = model.predict([features])

    if prediction[0] == 1:
        explanation = get_feature_importance()
        return {
            "type": "Anomaly Detected",
            "severity": "High",
            "explanation": explanation
        }
    return None
