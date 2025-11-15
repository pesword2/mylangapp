import words from "../data/words.json";

function Stats() {
  const total = words.length;
  const levels = ["A1","A2","B1","B2"];
  const levelColors = {
    A1: "#4CAF50",
    A2: "#F1C40F",
    B1: "#E67E22",
    B2: "#E74C3C"
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.total}>Toplam Kelime: {total}</h2>

        <div style={styles.grid}>
          {levels.map(lvl => {
            const count = words.filter(w => w.level === lvl).length;
            return (
              <details key={lvl} style={{...styles.detail, borderTop:`6px solid ${levelColors[lvl]}`}}>
                <summary style={styles.summary}>{lvl} Seviyesi</summary>
                <p style={styles.count}>{count} kelime</p>
              </details>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container:{ minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center",
    background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding:"24px" },
  card:{ background:"#fff", padding:"32px", borderRadius:"16px", boxShadow:"0 10px 24px rgba(0,0,0,0.2)", width:"720px", maxWidth:"100%" },
  total:{ fontSize:"2rem", fontWeight:"800", color:"#222", marginBottom:"16px" },
  grid:{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:"16px" },
  detail:{ background:"#fafafa", borderRadius:"12px", padding:"16px", boxShadow:"0 4px 12px rgba(0,0,0,0.08)" },
  summary:{ cursor:"pointer", fontWeight:"700", color:"#333", marginBottom:"8px" },
  count:{ color:"#555", fontWeight:"600" }
};

export default Stats;

