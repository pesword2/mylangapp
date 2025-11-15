// src/pages/Practice.jsx
import React,{useEffect,useMemo,useState,useRef} from "react";
import wordsData from "../data/words.json";

export default function Practice({level,onExit}){
  const [index,setIndex] = useState(0);
  const [showAnswer,setShowAnswer] = useState(false);
  const [voices,setVoices] = useState([]);
  const [selectedVoice,setSelectedVoice] = useState(null);
  const [rate,setRate] = useState(0.9);
  const [pitch,setPitch] = useState(1.05);
  const synth = useRef(typeof window !== "undefined" ? window.speechSynthesis : null);

  // kadın sesi tercih eden yükleme
  useEffect(()=>{
    const load = () => {
      const v = synth.current ? synth.current.getVoices() : [];
      setVoices(v || []);

      // Öncelik: en (English) kadın sesi isim veya özelliklerine göre
      const candidates = (v || []).filter(x => x.lang && x.lang.toLowerCase().startsWith("en"));
      const pick =
        candidates.find(x => /female|woman|samantha|zira|ally|anna|victoria|kate|olivia/i.test((x.name||"").toLowerCase())) ||
        candidates.find(x => /female|woman/i.test((x.name||"").toLowerCase())) ||
        (v || [])[0] || null;

      setSelectedVoice(pick);
    };

    load();
    if (synth.current) synth.current.onvoiceschanged = load;
    return () => { if (synth.current) synth.current.onvoiceschanged = null; };
  },[]);

  const list = useMemo(()=> wordsData.filter(w=> w.level === (level||"A1")), [level]);
  useEffect(()=> { setIndex(0); setShowAnswer(false); }, [level]);

  // otomatik ses: her kelime değiştiğinde İngilizce telaffuzunu nazik kadın sesiyle oynat
  useEffect(()=>{
    if(!synth.current || !list.length) return;
    const item = list[index];
    if(!item) return;
    try{
      synth.current.cancel();
      const u = new SpeechSynthesisUtterance(item.english);
      if(selectedVoice) u.voice = selectedVoice;
      u.lang = selectedVoice?.lang || "en-US";
      u.rate = rate;
      u.pitch = pitch;
      synth.current.speak(u);
    }catch(e){
      console.warn("TTS error", e);
    }
  }, [index, selectedVoice, rate, pitch, list]);

  if(!list.length) return (
    <div className="container">
      <div className="card">
        <h3>Kelime bulunamadı</h3>
        <div>Seçili seviyede kelime yok. Geri dönüp başka seviye seç.</div>
        <div style={{marginTop:12}}>
          <button className="level-btn" onClick={()=> onExit()}>Geri</button>
        </div>
      </div>
    </div>
  );

  const item = list[index];
  const total = list.length;

  return(
    <div className="container">
      <div className="card" style={{textAlign:"center"}}>

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <div style={{fontSize:14,color:"var(--muted)"}}>{level} seviye</div>
          <div style={{display:"flex",gap:10,alignItems:"center"}}>
            {/* Voice ismi gösterimi (gizlemek istersen bu bölümü kaldır) */}
            <div style={{fontSize:13,color:"var(--muted)"}}>
              {selectedVoice ? `${selectedVoice.name}` : "Ses yükleniyor"}
            </div>
          </div>
        </div>

        <div className="word-big" aria-live="polite">{item.english}</div>
        <div className="pron">{item.pronunciation}</div>

        <div className="controls" style={{justifyContent:"center"}}>
          <button className="icon-btn" aria-label="Sesli telaffuz" onClick={()=>{
            if(!synth.current) return alert("Tarayıcı TTS desteklemiyor.");
            synth.current.cancel();
            const u = new SpeechSynthesisUtterance(item.english);
            if(selectedVoice) u.voice = selectedVoice;
            u.lang = selectedVoice?.lang || "en-US";
            u.rate = rate;
            u.pitch = pitch;
            synth.current.speak(u);
          }}>🔊</button>

          <button className="icon-btn" onClick={()=> setShowAnswer(s=>!s)}>
            {showAnswer ? "Cevabı Gizle" : "Cevabı Göster"}
          </button>
        </div>

        {showAnswer && (
          <div style={{marginTop:12}}>
            <div className="example">{item.turkish}</div>
            <div className="example" style={{marginTop:8}}>{item.example_sentence}</div>
          </div>
        )}

        <div className="progress-wrap" style={{marginTop:14}}>
          <div style={{fontSize:13}}>{index+1}/{total}</div>
          <div className="progress-bar" style={{marginLeft:10,marginRight:10}}>
            <div className="progress-fill" style={{width:`${Math.round(((index+1)/total)*100)}%`}} />
          </div>
          <div style={{width:56,textAlign:"right",fontSize:13}}>{Math.round(((index+1)/total)*100)}%</div>
        </div>

        <div className="controls" style={{marginTop:16}}>
          <button className="level-btn" onClick={()=> { setIndex(i=> Math.max(0,i-1)); setShowAnswer(false); }}>Önceki</button>
          <button className="primary" onClick={()=> {
            if(index+1 >= total) { onExit(); return; }
            setIndex(i=> Math.min(total-1,i+1));
            setShowAnswer(false);
          }}>{index+1 >= total ? "Bitir" : "Sonraki"}</button>
          <button className="level-btn" onClick={()=> onExit()}>Bitir</button>
        </div>

        <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:8,marginTop:12}}>
          <div style={{fontSize:13,color:"var(--muted)"}}>Hız</div>
          <input aria-label="TTS hız" type="range" min="0.6" max="1.1" step="0.05" value={rate} onChange={e=>setRate(Number(e.target.value))} />
          <div style={{fontSize:13,color:"var(--muted)"}}>Pitch</div>
          <input aria-label="TTS pitch" type="range" min="0.8" max="1.2" step="0.05" value={pitch} onChange={e=>setPitch(Number(e.target.value))} />
        </div>

      </div>
    </div>
  );
}

