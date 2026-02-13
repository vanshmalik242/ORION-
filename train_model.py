from sklearn.ensemble import RandomForestClassifier
import joblib
import numpy as np

# Dummy training data (replace with NSL-KDD later)
X = np.random.rand(1000, 3)
y = np.random.randint(0, 2, 1000)

model = RandomForestClassifier()
model.fit(X, y)

joblib.dump(model, "model.pkl")