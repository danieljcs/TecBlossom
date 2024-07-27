# Dockerfile para MySQL (opcional)
FROM mysql:8.0

# Copia el script de inicialización al contenedor
COPY init.sql /docker-entrypoint-initdb.d/

# Establece las variables de entorno
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=rick_and_blossom
ENV MYSQL_USER=rickblossom
ENV MYSQL_PASSWORD=rickblossom123
