
# Rick & Blossom

## Prueba Tecnica FullStack

PreRequisitos:
- **Redis**
- **Mysql**
- **NodeJS**
- **Python**
- **Docker (Opcional)**

El proyecto tiene la estructura:

### Explicación de los Archivos y Directorios

- **BACK**: Directorio para el backend de la aplicación.
  - `config`, `decorators`, `src` , `middlewares`, `migrations`, `models`, `seeders`: Subdirectorios que contienen configuraciones, decoradores, middlewares, migraciones de base de datos, modelos de datos y datos iniciales, respectivamente.
  - `.gitignore`: Archivo que especifica qué archivos y directorios deben ser ignorados por Git.
  - `dockerfile`: Archivo de Docker para el backend.
  - `package-lock.json`: Archivo que bloquea las versiones exactas de las dependencias instaladas.
  - `package.json`: Archivo que contiene metadatos relevantes para el proyecto, así como las dependencias del backend.

- **FRONT**: Directorio para el frontend de la aplicación.
  - `public`: Directorio público del frontend.
  - `src`: Directorio principal del código fuente del frontend.
  - `.gitignore`: Archivo que especifica qué archivos y directorios deben ser ignorados por Git.
  - `dockerfile`: Archivo de Docker para el frontend.
  - `package-lock.json`: Archivo que bloquea las versiones exactas de las dependencias instaladas.
  - `package.json`: Archivo que contiene metadatos relevantes para el proyecto, así como las dependencias del frontend.
  - `pythonLoad.py`: Archivo Python (propósito específico no determinado con la información dada).
  - `README.md`: Archivo de documentación del frontend.
  - `tailwind.config.js`: Archivo de configuración para Tailwind CSS.

- **UTILS**: Directorio para utilidades y configuraciones compartidas.
  - `dockerfile`: Archivo de Docker para utilidades (propósito específico no determinado con la información dada).
  - `init.sql`: Script SQL para inicialización de base de datos.
  - `pythonLoad.py`: Archivo Python (propósito específico no determinado con la información dada).
  - `requirements.txt`: Archivo que lista las dependencias de Python necesarias.
- **docker-compose.yml**: Archivo de configuración de Docker Compose.
- **dockerfile**: Otro archivo de Docker (propósito específico no determinado con la información dada).

## Instalación

Modificar las cadenas de conexion segun lo necesario en las rutas
BACK\config\config.json
UTILS\pythonLoad.py

**Llenar la base de datos**

ejecutar el comando para llenar la base de datos con los datos de la api publica de RICK&MORTY esto cargara todos los registros disponibles en la pagina actualmente (826)
```bash 
 pip install -r requirements.txt
 python UTILS/pythonLoad.py
```
**Ejecutar el Backend**

ejecutar el comando inicar el backend (teniendo en cuenta que el servidor redis debe estar ejecutandose en su puerto por defecto)
```bash 
 cd BACK
 npm install
 node src/index.js
```
**Ejecutar el FrontEnd**

ejecutar el comando inicar el FrontEnd 
```bash 
 cd FRONT
 npm install
 npm start
```

en caso de usar docker solo es necesario ejecutar el comando 
```bash 
docker compose up --build
```


## Uso

para la aplicacion de FRONT la ruta es : http://localhost:3000/
en la cual visualizaran la interfaz de los personajes con posibles filtros y otras funcionalidades

para la aplicacion de BACK la ruta es: http://localhost:4000/
el cual abrira la interfaz de GraphiQL, ejemplo de query para consulta con solo 2 campos:
```bash 
query {
  characters(page: 1, 
    filter:  {}
  ){
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
    }
  }
}

```

