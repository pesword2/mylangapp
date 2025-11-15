import { useEffect, useMemo, useState } from "react";
import words from "../data/words.json";

function Practice() {
  const params = new URLSearchParams(window.location.search);
  const level = params.get("level") || "A1";

  const levelPalette = {
    A1: "#4CAF50",
    A2: "#F1C40F",
    B1: "#E67E22",
    B2: "#E74C3C"
  };

  const filtered = useMemo(() => words.filter(w => w.level === level), [level]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setIndex(0);
    setShowAnswer(false);
  }, [level]);

  const word = filtered[index];

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const next = () => setIndex(i => Math.min(i + 1, filtered.length - 1));
  const prev = () => setIndex(i => Math.max(i - 1, 0));

  if (!word) {
    return (
      <div style={styles.empty}>
        Seçilen seviyede kelime yok. Lütfen farklı bir seviye deneyin.
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={{...styles.card, borderTop: `6px solid ${levelPalette[level]}`}}>
        <div style={styles.header}>
          <span style={{...styles.levelTag, background: levelPalette[level]}}>
            {level}
          </span>
          <span style={styles.progress}>{index + 1}/{filtered.length}</span>
        </div>

        <h2 style={styles.word}>{word.english}</h2>
        <p style={styles.pronunciation}>{word.pronunciation}</p>

        <div style={styles.actionsRow}>
          <button onClick={() => speak(word.english)} style={styles.speaker}>🔊 Telaffuz</button>
          <button onClick={() => setShowAnswer(s => !s)} style={styles.toggle}>
            {showAnswer ? "Cevabı Gizle" : "Cevabı Göster"}
          </button>
        </div>

        {showAnswer && (
          <p style={styles.answer}>
            {word.turkish}
          </p>
        )}

        <p style={styles.example}>
          {word.example_sentence}
        </p>

        <div style={styles.nav}>
          <button onClick={prev} style={styles.navBtn} disabled={index === 0}>Önceki</button>
          <button onClick={next} style={styles.navBtn} disabled={index === filtered.length - 1}>Sonraki</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container:{ minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center",
    background:"linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", padding:"24px" },
  card:{ background:"#fff", padding:"32px", borderRadius:"16px", boxShadow:"0 10px 24px rgba(0,0,0,0.2)", width:"720px", maxWidth:"100%" },
  header:{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" },
  levelTag:{ color:"#fff", padding:"6px 10px", borderRadius:"8px", fontWeight:"bold" },
  progress:{ color:"#555", fontWeight:"bold" },
  word:{ fontSize:"3rem", margin:"12px 0", textAlign:"center", fontWeight:"800", color:"#222" },
  pronunciation:{ textAlign:"center", color:"#666", fontSize:"1.2rem", marginBottom:"10px" },
  actionsRow:{ display:"flex", gap:"12px", justifyContent:"center", margin:"12px 0" },
  speaker:{ padding:"10px 16px", border:"none", borderRadius:"10px", background:"#4285F4", color:"#fff", fontWeight:"bold", cursor:"pointer" },
  toggle:{ padding:"10px 16px", border:"none", borderRadius:"10px", background:"#764ba2", color:"#fff", fontWeight:"bold", cursor:"pointer" },
  answer:{ textAlign:"center", fontSize:"1.6rem", fontWeight:"700", color:"#2ecc71", margin:"6px 0 14px" },
  example:{ textAlign:"center", fontStyle:"italic", color:"#555", background:"#f9f9fb", padding:"12px", borderRadius:"10px" },
  nav:{ display:"flex", justifyContent:"space-between", marginTop:"16px" },
  navBtn:{ padding:"10px 16px", border:"none", borderRadius:"10px", background:"#333", color:"#fff", fontWeight:"bold", cursor:"pointer" },
  empty:{ minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center",
    color:"#fff", background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)", fontWeight:"bold" }
};

export default Practice;


