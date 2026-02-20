import { useState, useEffect } from 'react';

function KanjiForm({ alGuardar, kanjiEditando, alCancelar }) {
  const [datos, setDatos] = useState({ character: '', meaning: '', reading: '' });

  // Si cambia el kanji que queremos editar, actualizamos los inputs
  useEffect(() => {
    if (kanjiEditando) {
      setDatos(kanjiEditando);
    } else {
      setDatos({ character: '', meaning: '', reading: '' });
    }
  }, [kanjiEditando]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alGuardar(datos); // Le enviamos los datos al padre (App.jsx)
  };

  return (
    <form onSubmit={handleSubmit} className="kanji-form">
      <h3>{kanjiEditando ? 'Editar Kanji' : 'Nuevo Kanji'}</h3>
      <input 
        placeholder="Kanji" 
        value={datos.character} 
        onChange={(e) => setDatos({...datos, character: e.target.value})} 
        required 
      />
      <input 
        placeholder="Significado" 
        value={datos.meaning} 
        onChange={(e) => setDatos({...datos, meaning: e.target.value})} 
        required 
      />
      <input 
        placeholder="Lectura" 
        value={datos.reading} 
        onChange={(e) => setDatos({...datos, reading: e.target.value})} 
        required 
      />
      <button type="submit">{kanjiEditando ? 'Actualizar' : 'Guardar'}</button>
      {kanjiEditando && <button type="button" onClick={alCancelar}>Cancelar</button>}
    </form>
  );
}

export default KanjiForm;