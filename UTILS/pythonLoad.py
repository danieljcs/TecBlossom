import requests
import mysql.connector
from mysql.connector import errorcode
from datetime import datetime
# Configuración de la conexión a MySQL
config = {
    'user': 'rickblossom',
    'password': 'rickblossom123',
    'host': 'localhost',
    'database': 'rick_and_blossom',
    'raise_on_warnings': True
}

try:
    # Establecer la conexión
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Usuario o contraseña incorrectos")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Base de datos no existe")
    else:
        print(err)
    exit(1)

# Función para convertir la fecha y hora al formato de MySQL
def convert_datetime(dt_str):
    try:
        # Convertir el string de fecha en un objeto datetime
        dt = datetime.strptime(dt_str, '%Y-%m-%dT%H:%M:%S.%fZ')
        # Convertir el objeto datetime a un string en formato MySQL
        return dt.strftime('%Y-%m-%d %H:%M:%S')
    except ValueError:
        # Si la conversión falla, devolver None
        return None

# Función para insertar un personaje en la base de datos
def insert_character(character):
    created_date = convert_datetime(character.get('created', ''))
    cursor.execute("""
        INSERT INTO Characters (id, name, status, species, type, gender, origin_name, origin_url, location_name, location_url, image, url, created, comment, is_favorite)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) AS new_foo
        
    """, (
        character['id'],
        character['name'],
        character.get('status', ''),
        character.get('species', ''),
        character.get('type', ''),
        character.get('gender', ''),
        character.get('origin', {}).get('name', ''),
        character.get('origin', {}).get('url', ''),
        character.get('location', {}).get('name', ''),
        character.get('location', {}).get('url', ''),
        character.get('image', ''),
        character.get('url', ''),
        created_date,
        '',  # Comentario (puedes ajustarlo si tienes datos)
        False  # Favorito (puedes ajustarlo si tienes datos)
    ))

    conn.commit()


# Función para procesar una página de resultados
def process_page(url):
    response = requests.get(url)
    data = response.json()
    
    # Insertar personajes
    for character in data['results']:
        insert_character(character)

    # Procesar la siguiente página si existe
    if data['info']['next']:
        process_page(data['info']['next'])

# Procesar la primera página
start_url = 'https://rickandmortyapi.com/api/character'
process_page(start_url)
# 
# Cerrar la conexión
cursor.close()
conn.close()
