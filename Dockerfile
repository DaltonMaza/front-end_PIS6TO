# Etapa 1: Construcción
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Instalar "serve" para servir la aplicación
RUN npm install -g serve

# Etapa 2: Servir la aplicación
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar los archivos construidos desde la etapa de construcción
COPY --from=builder /app ./

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación en modo producción
CMD ["serve", "-s", "out", "-l", "3000"]
