import time

blacklisted_ips = {}

def add_to_blacklist(ip):
    blacklisted_ips[ip] = time.time()

def is_blacklisted(ip):
    if ip in blacklisted_ips:
        # Block for 5 minutes
        if time.time() - blacklisted_ips[ip] < 300:
            return True
        else:
            del blacklisted_ips[ip]
    return False
