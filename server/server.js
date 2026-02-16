const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Módulo para manejar archivos
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const ARCHIVO_DATOS = path.join(__dirname, 'kanjis.json');

// Funciones de ayuda para no repetir código
const leerDatos = () => {
  const data = fs.readFileSync(ARCHIVO_DATOS, 'utf-8');
  return JSON.parse(data);
};

const guardarDatos = (datos) => {
  fs.writeFileSync(ARCHIVO_DATOS, JSON.stringify(datos, null, 2));
};

// Rutas
app.get('/api/kanjis', (req, res) => {
  const kanjis = leerDatos();
  res.json(kanjis);
});

app.post('/api/kanjis', (req, res) => {
  const kanjis = leerDatos();
  const nuevoKanji = { id: Date.now(), ...req.body };
  kanjis.push(nuevoKanji);
  guardarDatos(kanjis);
  res.status(201).json(nuevoKanji);
});

app.delete('/api/kanjis/:id', (req, res) => {
  const { id } = req.params;
  let kanjis = leerDatos();
  kanjis = kanjis.filter(k => k.id !== parseInt(id));
  guardarDatos(kanjis);
  res.json({ message: "Borrado de disco" });
});

app.put('/api/kanjis/:id', (req, res) => {
  const { id } = req.params;
  const datosActualizados = req.body;
  let kanjis = leerDatos();
  
  // Buscamos el kanji y lo actualizamos
  kanjis = kanjis.map(k => k.id === parseInt(id) ? { ...k, ...datosActualizados } : k);
  
  guardarDatos(kanjis);
  res.json({ message: "Kanji actualizado en disco" });
});

app.listen(5000, () => console.log("Servidor con persistencia en puerto 5000"));