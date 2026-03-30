from scapy.layers.inet import IP, TCP, UDP

def extract_features(packet):
    try:
        # Protocol encoding
        if packet.haslayer(TCP):
            proto = 0
        elif packet.haslayer(UDP):
            proto = 1
        else:
            proto = 2

        # Packet size
        src_bytes = len(packet)

        # Payload size
        if hasattr(packet, "payload"):
            dst_bytes = len(packet.payload)
        else:
            dst_bytes = 0

        return {
            "src_bytes": src_bytes,
            "dst_bytes": dst_bytes,
            "protocol_type": proto
        }

    except Exception as e:
        return None