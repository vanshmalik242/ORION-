def calculate_threat_score(sig_alert, ml_alert):
    score = 0

    if sig_alert:
        score += 40

    if ml_alert:
        score += 50

    return min(score, 100)
