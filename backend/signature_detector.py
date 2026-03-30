from scapy.layers.inet import TCP

def check_signature(packet):
    # simple dummy logic
    if len(packet) > 1500:
        return True
    return False

        