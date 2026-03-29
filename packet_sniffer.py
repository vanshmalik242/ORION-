from scapy.layers.inet import IP
from threat_score import calculate_threat_score
from reputation_engine import update_reputation
from adaptive_engine import determine_severity
from blacklist import add_to_blacklist, is_blacklisted

def process_packet(packet):
    if IP not in packet:
        return

    src_ip = packet[IP].src

    if is_blacklisted(src_ip):
        return

    features = extract_features(packet)
    if not features:
        return

    sig_alert = check_signature(packet)
    ml_alert = check_anomaly(features)

    threat_score = calculate_threat_score(sig_alert, ml_alert)

    if threat_score > 0:
        reputation_score = update_reputation(src_ip)
        severity = determine_severity(threat_score, reputation_score)

        if severity == "Critical":
            add_to_blacklist(src_ip)

        save_alert({
            "type": "Suspicious Activity",
            "severity": severity
        })
