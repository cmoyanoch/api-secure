const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const app = express();

// Cargar certificados SSL
// Asegúrate de que los paths './ssl/key.pem' y './ssl/cert.pem' sean correctos
// dentro del contexto donde se ejecuta la app (sea local o dentro del contenedor).
const privateKey = fs.readFileSync('./ssl/key.pem', 'utf8');
const certificate = fs.readFileSync('./ssl/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Middleware CORS para permitir peticiones desde cualquier origen
app.use(cors());

// Middleware global para registrar cada petición en la consola
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Continúa al siguiente middleware o ruta
});

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());

// --- Rutas de la API ---

// Ruta raíz: Responde con un mensaje simple
app.get('/', (req, res) => {
  res.send('Servidor HTTPS con CORS habilitado ✅');
});

// Ruta de "echo": Recibe un JSON en el cuerpo de la petición POST y lo devuelve
app.post('/api/echo', (req, res) => {
  // Aquí puedes agregar lógica para procesar 'req.body' antes de devolverlo
  res.json({ recibido: req.body }); // Devuelve el cuerpo de la petición como JSON
});

// --- Inicio del Servidor HTTPS ---

const PORT = process.env.PORT || 3443; // El puerto se puede configurar con una variable de entorno o usa 3443 por defecto
https.createServer(credentials, app).listen(PORT, () => {
  console.log(`✅ Servidor HTTPS corriendo en https://localhost:${PORT}`);
});