from scapy.layers.inet import TCP

def check_signature(packet):
    if packet.haslayer(TCP):
        flags = packet[TCP].flags

        # SYN Scan detection
        if flags == "S":
            return {
                "type": "SYN Scan",
                "severity": "Medium"
            }

    return None