import geoip2.database

try:
    reader = geoip2.database.Reader("GeoLite2-City.mmdb")
except Exception:
    reader = None


def get_location(ip):
    if reader is None:
        return None

    try:
        response = reader.city(ip)
        return {
            "lat": response.location.latitude,
            "lon": response.location.longitude
        }
    except Exception:
        return None
