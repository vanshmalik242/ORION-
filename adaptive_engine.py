def determine_severity(threat_score, reputation_score):
    total = threat_score + reputation_score

    if total > 120:
        return "Critical"
    elif total > 80:
        return "High"
    elif total > 50:
        return "Medium"
    else:
        return "Low"
