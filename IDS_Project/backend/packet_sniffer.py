from scapy.all import sniff
from feature_extractor import extract_features
from signature_detector import check_signature
from anomaly_detector import check_anomaly
from database import save_alert

def process_packet(packet):
    features = extract_features(packet)

    if not features:
        return

    # Signature Detection
    sig_alert = check_signature(packet)

    # ML Detection
    ml_alert = check_anomaly(features)

    if sig_alert:
        save_alert(sig_alert)

    if ml_alert:
        save_alert(ml_alert)

def start_sniffing():
    sniff(prn=process_packet, store=False)