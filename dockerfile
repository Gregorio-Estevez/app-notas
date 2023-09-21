# Usar una imagen base de Node.js
FROM node:16

# Establecer el directorio de trabajo en la imagen
WORKDIR /app-notas

# Copiar los archivos de la aplicación al directorio de trabajo en la imagen
COPY package.json package-lock.json /app-notas/

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto de los archivos de la aplicación al directorio de trabajo en la imagen
COPY . /app-notas/

# Exponer un puerto en el contenedor (si tu aplicación escucha en un puerto específico)
EXPOSE 3000

# Comando para ejecutar tu aplicación cuando se inicie el contenedor
CMD [ "npm", "start" ]
