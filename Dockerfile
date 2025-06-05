FROM node:20-alpine

# Instalamos bash y otros paquetes opcionales (útil para depuración/red)
RUN apk add --no-cache bash curl

WORKDIR /app

# Copiamos primero solo los archivos de dependencias
COPY package*.json ./

# Instalamos con manejo de errores
RUN npm install --legacy-peer-deps || npm install --legacy-peer-deps

# Copiamos el resto de los archivos
COPY . .

EXPOSE 3443

CMD ["node", "app.js"]
