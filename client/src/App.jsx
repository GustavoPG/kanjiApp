import { useState, useEffect } from 'react';
import KanjiCard from './components/KanjiCard';
import KanjiForm from './components/KanjiForm';
import './App.css';

function App() {
  const [kanjis, setKanjis] = useState([]);
  const [editando, setEditando] = useState(null);

  // Cargar datos
  useEffect(() => {
    fetch('http://localhost:5000/api/kanjis').then(res => res.json()).then(setKanjis);
  }, []);

  // Función unificada para Guardar/Editar
  const handleGuardar = async (datos) => {
    const url = editando ? `http://localhost:5000/api/kanjis/${editando.id}` : 'http://localhost:5000/api/kanjis';
    const metodo = editando ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    if (res.ok) {
      // Recargamos la lista para ver cambios
      const actualizada = await fetch('http://localhost:5000/api/kanjis').then(r => r.json());
      setKanjis(actualizada);
      setEditando(null);
    }
  };

  const handleBorrar = async (id) => {
    if (await fetch(`http://localhost:5000/api/kanjis/${id}`, { method: 'DELETE' })) {
      setKanjis(kanjis.filter(k => k.id !== id));
    }
  };

  return (
    <div className="App">
      <h1>Kanji Sensei 🏯</h1>
      
      <KanjiForm 
        alGuardar={handleGuardar} 
        kanjiEditando={editando} 
        alCancelar={() => setEditando(null)} 
      />

      <div className="kanji-grid">
        {kanjis.map(k => (
          <KanjiCard 
            key={k.id} 
            kanji={k} 
            onBorrar={handleBorrar} 
            onEditar={setEditando} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;