from scapy.layers.inet import IP, TCP, UDP

def extract_features(packet):
    if IP in packet:
        proto = 0
        if TCP in packet:
            proto = 1
        elif UDP in packet:
            proto = 2

        return [
            len(packet),
            proto,
            packet[IP].ttl
        ]
    return None