from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

load_dotenv()
db_config = {
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST'),
    'database': os.getenv('DB_NAME')
}

def get_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

@app.route('/api/movies', methods=['GET'])
def get_movies():
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=20, type=int)
    search_query = request.args.get('search', default='', type=str)

    connection = get_db_connection()
    if not connection:
        return jsonify({'error': 'Unable to connect to database'}), 500

    try:
        cursor = connection.cursor(dictionary=True)
        offset = (page - 1) * per_page
        query = """
        SELECT id, nome, texto, capa, cover
        FROM filmes
        WHERE nome LIKE %s AND capa IS NOT NULL AND capa != ''
        LIMIT %s OFFSET %s
        """
        search_param = f"%{search_query}%"
        cursor.execute(query, (search_param, per_page, offset))
        movies = cursor.fetchall()

        cursor.execute("SELECT COUNT(*) AS total FROM filmes WHERE nome LIKE %s AND capa IS NOT NULL AND capa != ''", (search_param,))
        total = cursor.fetchone()['total']

        cursor.close()
        connection.close()
        return jsonify({
            'total': total,
            'page': page,
            'per_page': per_page,
            'data': movies
        })
    except Error as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
