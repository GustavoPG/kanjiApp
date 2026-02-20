// client/src/components/KanjiCard.jsx
function KanjiCard({ kanji, onBorrar, onEditar }) {
  return (
    <div className="kanji-card">
      <button className="delete-btn" onClick={() => onBorrar(kanji.id)}>×</button>
      <button className="edit-btn" onClick={() => onEditar(kanji)}>✎</button>
      
      <span className="character">{kanji.character}</span>
      <div className="info">
        <strong>{kanji.meaning}</strong>
        <p>Lectura: {kanji.reading}</p>
      </div>
    </div>
  );
}

export default KanjiCard;