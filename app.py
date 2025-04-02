from flask import Flask, render_template, request, jsonify
import sqlite3
from datetime import datetime
import os

app = Flask(__name__)

DATABASE = 'scores.db'       # Local fallback

def init_db():
    # Create the database and table if they do not exist.
    if not os.path.exists(DATABASE):
        conn = sqlite3.connect(DATABASE)
        c = conn.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS scores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                score INTEGER,
                timestamp TEXT
            )
        ''')
        conn.commit()
        conn.close()

# Initialize the database when the app starts.
init_db()

@app.route('/')
def index():
    # Render the quiz page.
    return render_template('index.html')

@app.route('/score')
def score_page():
    # Render the score/result page.
    return render_template('score.html')

@app.route('/submit-score', methods=['POST'])
def submit_score():
    # This route accepts a POST request with the user's score.
    data = request.get_json()
    score = data.get('score')
    timestamp = datetime.now().isoformat()  # current timestamp

    # Insert the score into the database.
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute('INSERT INTO scores (score, timestamp) VALUES (?, ?)', (score, timestamp))
    conn.commit()
    conn.close()

    # Return a JSON response indicating the score was saved.
    return jsonify({'message': 'Score saved successfully!'})

@app.route('/scores', methods=['GET'])
def get_scores():
    # This route returns all saved scores as JSON (for a leaderboard, if needed).
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()
    c.execute('SELECT score, timestamp FROM scores ORDER BY id DESC')
    rows = c.fetchall()
    conn.close()
    return jsonify(rows)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Render sets this dynamically
    app.run(host='0.0.0.0', port=port)


