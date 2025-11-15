// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Home({ user }) {
  const navigate = useNavigate();
  const [level, setLevel] = useState("A1");

  useEffect(() => {
    const saved = localStorage.getItem("preferredLevel");
    if (saved) setLevel(saved);
  }, []);

  const levelColors = {
    A1: "#4CAF50",
    A2: "#F1C40F",
    B1: "#E67E22",
    B2: "#E74C3C"
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      // İstersen kullanıcıya hata mesajı göster
    }
  };

  const setLevelAndSave = (l) => {
    setLevel(l);
    localStorage.setItem("preferredLevel", l);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <h2 style={styles.title}>MyLangApp</h2>
          <span style={styles.userText}>{user ? (user.displayName || user.email || "Guest") : "Guest"}</span>
        </div>

        <div style={styles.headerRight}>
          <button onClick={() => navigate("/stats")} style={styles.headerBtn}>İstatistikler</button>
          <button onClick={handleLogout} style={styles.logoutBtn}>Çıkış</button>
        </div>
      </header>

      <main style={styles.card}>
        <h3 style={styles.sectionTitle}>Seviye Seçimi</h3>
        <div style={styles.levels}>
          {["A1","A2","B1","B2"].map(l => (
            <button
              key={l}
              onClick={() => setLevelAndSave(l)}
              style={{
                ...styles.level,
                background: levelColors[l],
                opacity: level === l ? 1 : 0.75,
                transform: level === l ? "scale(1.05)" : "scale(1)"
              }}
            >
              {l}
            </button>
          ))}
        </div>

        <div style={styles.actions}>
          <button
            onClick={() => navigate(`/practice?level=${level}`)}
            style={styles.primary}
          >
            Pratik Yap
          </button>
          <button
            onClick={() => navigate("/stats")}
            style={styles.secondary}
          >
            İstatistikler
          </button>
        </div>

        <p style={styles.helper}>Seçili seviye: <strong>{level}</strong></p>
      </main>
    </div>
  );
}

const styles = {
  container:{ minHeight:"100vh", display:"flex", flexDirection:"column", background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  header:{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"18px 28px", color:"#fff" },
  brand:{ display:"flex", flexDirection:"column" },
  title:{ margin:0, fontSize:"1.4rem", fontWeight:800 },
  userText:{ fontSize:"0.9rem", color:"rgba(255,255,255,0.85)", marginTop:4 },
  headerRight:{ display:"flex", gap:12, alignItems:"center" },
  headerBtn:{ padding:"8px 12px", borderRadius:8, border:"none", background:"rgba(255,255,255,0.12)", color:"#fff", cursor:"pointer", fontWeight:700 },
  logoutBtn:{ padding:"8px 12px", borderRadius:8, border:"none", background:"#E53935", color:"#fff", cursor:"pointer", fontWeight:700 },

  card:{ margin:"40px auto", background:"#fff", maxWidth:900, width:"92%", borderRadius:14, padding:28, boxShadow:"0 12px 30px rgba(0,0,0,0.18)" },
  sectionTitle:{ margin:0, marginBottom:12, color:"#222" },
  levels:{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" },
  level:{ padding:"8px 14px", border:"none", borderRadius:10, color:"#fff", fontWeight:800, cursor:"pointer" },
  actions:{ display:"flex", gap:14, marginTop:8, flexWrap:"wrap" },
  primary:{ padding:"12px 18px", background:"#4CAF50", color:"#fff", border:"none", borderRadius:10, fontWeight:800, cursor:"pointer" },
  secondary:{ padding:"12px 18px", background:"#333", color:"#fff", border:"none", borderRadius:10, fontWeight:800, cursor:"pointer" },
  helper:{ marginTop:16, color:"#666" }
};

export default Home;

