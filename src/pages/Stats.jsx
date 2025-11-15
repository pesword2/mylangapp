// src/pages/Stats.jsx
import React,{useMemo,useState} from "react";
import wordsData from "../data/words.json";

export default function Stats(){
  const total = wordsData.length;
  const byLevel = useMemo(()=>{
    const map = {A1:[],A2:[],B1:[],B2:[]};
    wordsData.forEach(w => { if(map[w.level]) map[w.level].push(w); });
    return map;
  },[]);

  const [open, setOpen] = useState({A1:false,A2:false,B1:false,B2:false});

  return (
    <div className="container" style={{marginTop:18}}>
      <div className="card">
        <h3>İstatistikler</h3>

        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{fontSize:36,fontWeight:800,color:"var(--primary-start)"}}>{total}</div>
          <div style={{color:"var(--muted)"}}>Toplam kelime sayısı</div>
        </div>

        <div className="stats-grid">
          {Object.entries(byLevel).map(([lvl,arr])=>(
            <div key={lvl} className="stat-card">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontWeight:700}}>{lvl}</div>
                <div style={{fontSize:16,fontWeight:800}}>{arr.length}</div>
              </div>

              <div className="level-row" style={{cursor:"pointer"}} onClick={()=> setOpen(o=> ({...o,[lvl]:!o[lvl]}))}>
                <div style={{fontSize:13,color:"var(--muted)"}}>{open[lvl] ? "Detayları gizle" : "Detayları göster"}</div>
                <div style={{fontSize:13,color: open[lvl] ? "var(--primary-start)" : "var(--muted)"}}>{open[lvl] ? "▲" : "▼"}</div>
              </div>

              {open[lvl] && (
                <div style={{marginTop:8}}>
                  {arr.map(w=>(
                    <div key={w.id} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderTop:"1px dashed #eee"}}>
                      <div style={{fontSize:14}}>{w.english}</div>
                      <div style={{fontSize:14,color:"var(--muted)"}}>{w.turkish}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

