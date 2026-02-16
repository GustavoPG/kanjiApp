import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [kanjis, setKanjis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevoKanji, setNuevoKanji] = useState({ character: '', meaning: '', reading: '' });
  const [editandoId, setEditandoId] = useState(null);

  // 1. Cargar datos iniciales
  useEffect(() => {
    fetch('http://localhost:5000/api/kanjis')
      .then(res => res.json())
      .then(data => {
        setKanjis(data);
        setLoading(false);
      });
  }, []);

  // 2. Lógica para Guardar
  const handleGuardar = async (e) => {
  e.preventDefault();
  
  const url = editandoId 
    ? `http://localhost:5000/api/kanjis/${editandoId}` 
    : 'http://localhost:5000/api/kanjis';
  
  const metodo = editandoId ? 'PUT' : 'POST';

  const respuesta = await fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoKanji)
  });

  if (respuesta.ok) {
    // Refrescamos la lista completa desde el servidor para estar seguros
    const res = await fetch('http://localhost:5000/api/kanjis');
    const data = await res.json();
    setKanjis(data);
    
    // Limpiar formulario y salir de modo edición
    setNuevoKanji({ character: '', meaning: '', reading: '' });
    setEditandoId(null);
  }
};

  // 3. Lógica para Borrar
  const handleBorrar = async (id) => {
    const respuesta = await fetch(`http://localhost:5000/api/kanjis/${id}`, { method: 'DELETE' });
    if (respuesta.ok) {
      setKanjis(kanjis.filter(k => k.id !== id));
    }
  };

  const prepararEdicion = (kanji) => {
  setEditandoId(kanji.id);
  setNuevoKanji({
    character: kanji.character,
    meaning: kanji.meaning,
    reading: kanji.reading
  });
};

  return (
    <div className="App">
      <h1>Mi Diccionario de Kanjis 🇯🇵</h1>
      
      {/* Formulario para agregar */}
      <form onSubmit={handleGuardar} className="kanji-form">
        <input placeholder="Kanji" value={nuevoKanji.character} onChange={(e) => setNuevoKanji({...nuevoKanji, character: e.target.value})} required />
        <input placeholder="Significado" value={nuevoKanji.meaning} onChange={(e) => setNuevoKanji({...nuevoKanji, meaning: e.target.value})} required />
        <input placeholder="Lectura" value={nuevoKanji.reading} onChange={(e) => setNuevoKanji({...nuevoKanji, reading: e.target.value})} required />
        <button type="submit">Guardar</button>
      </form>

      {loading ? <p>Cargando...</p> : (
        <div className="kanji-grid">
          {/* AQUÍ VA EL BLOQUE QUE PREGUNTASTE */}
          {kanjis.map((kanji) => (
            <div key={kanji.id} className="kanji-card">
              <button className="delete-btn" onClick={() => handleBorrar(kanji.id)}>×</button>
              <button className="edit-btn" onClick={() => prepararEdicion(kanji)}>✎</button>
              <span className="character">{kanji.character}</span>
              <div className="info">
                <strong>{kanji.meaning}</strong>
                <p>Lectura: {kanji.reading}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App