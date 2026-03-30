import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

# Load dataset
train_path = "dataset/KDDTrain+.txt"

columns = [
    "duration","protocol_type","service","flag","src_bytes","dst_bytes","land",
    "wrong_fragment","urgent","hot","num_failed_logins","logged_in","num_compromised",
    "root_shell","su_attempted","num_root","num_file_creations","num_shells",
    "num_access_files","num_outbound_cmds","is_host_login","is_guest_login",
    "count","srv_count","serror_rate","srv_serror_rate","rerror_rate","srv_rerror_rate",
    "same_srv_rate","diff_srv_rate","srv_diff_host_rate","dst_host_count",
    "dst_host_srv_count","dst_host_same_srv_rate","dst_host_diff_srv_rate",
    "dst_host_same_src_port_rate","dst_host_srv_diff_host_rate","dst_host_serror_rate",
    "dst_host_srv_serror_rate","dst_host_rerror_rate","dst_host_srv_rerror_rate",
    "label","difficulty"
]

df = pd.read_csv(train_path, names=columns)

# ✅ KEEP ONLY FEATURES YOU CAN EXTRACT FROM PACKETS
df = df[["src_bytes", "dst_bytes", "protocol_type", "label"]]

# Encode protocol
le = LabelEncoder()
df["protocol_type"] = le.fit_transform(df["protocol_type"])

# Convert label to binary
df["label"] = df["label"].apply(lambda x: 0 if x == "normal" else 1)

# Split
X = df[["src_bytes", "dst_bytes", "protocol_type"]]
y = df["label"]

# Train
model = RandomForestClassifier()
model.fit(X, y)

# Save model + encoder
joblib.dump(model, "model.pkl")
joblib.dump(le, "encoder.pkl")

print("Model trained successfully 🚀")