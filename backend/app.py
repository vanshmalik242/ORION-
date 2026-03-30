from flask import Flask, render_template, jsonify
import sqlite3

app = Flask(__name__)

def get_alerts():
    conn = sqlite3.connect("alerts.db")
    cursor = conn.cursor()

    cursor.execute("SELECT src_ip, severity, timestamp FROM alerts ORDER BY id DESC LIMIT 50")
    data = cursor.fetchall()

    conn.close()
    return data

@app.route("/")
def dashboard():
    return render_template("index.html")

@app.route("/api/alerts")
def api_alerts():
    return jsonify(get_alerts())

if __name__ == "__main__":
    app.run(debug=True)