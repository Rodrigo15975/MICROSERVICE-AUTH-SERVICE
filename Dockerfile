# Usa una imagen de Node.js
FROM node:20-alpine

# Crea el directorio de la app
WORKDIR /app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la app
COPY . .

# Construye el proyecto (si usas TypeScript)
RUN npm run build

# Comando para iniciar la app
CMD ["npm", "run", "start:dev"]
