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

  useEffect(()=>{
    const load = () => {
      const v = synth.current ? synth.current.getVoices() : [];
      setVoices(v || []);
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
    <div className="container py-8">
      <div className="card bg-white/95 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Kelime bulunamadı</h3>
        <p className="text-gray-600 mb-4">Seçili seviyede kelime yok. Geri dönüp başka seviye seç.</p>
        <button 
          className="bg-gradient-to-r from-[#6a5af9] to-[#7b61ff] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-md transition-all"
          onClick={()=> onExit()}>Geri</button>
      </div>
    </div>
  );

  const item = list[index];
  const total = list.length;

  return(
    <div className="container py-8">
      <div className="card bg-white/95 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500 font-medium">{level} Seviye</span>
          <span className="text-xs text-gray-400">{selectedVoice ? selectedVoice.name : "Ses yükleniyor"}</span>
        </div>

        <div className="text-center py-6">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-3">{item.english}</h2>
          <p className="text-lg text-gray-500 font-medium">{item.pronunciation}</p>
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <button 
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 hover:bg-purple-100 text-2xl transition-all duration-200"
            aria-label="Sesli telaffuz" 
            onClick={()=>{
              if(!synth.current) return alert("Tarayıcı TTS desteklemiyor.");
              synth.current.cancel();
              const u = new SpeechSynthesisUtterance(item.english);
              if(selectedVoice) u.voice = selectedVoice;
              u.lang = selectedVoice?.lang || "en-US";
              u.rate = rate;
              u.pitch = pitch;
              synth.current.speak(u);
            }}>🔊</button>

          <button 
            className="px-5 py-3 rounded-lg font-semibold bg-gray-100 hover:bg-purple-100 text-gray-700 transition-all duration-200"
            onClick={()=> setShowAnswer(s=>!s)}>
            {showAnswer ? "Cevabı Gizle" : "Cevabı Göster"}
          </button>
        </div>

        {showAnswer && (
          <div className="mt-6 space-y-3 animate-fade-in">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-gray-800 font-medium">{item.turkish}</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-gray-700">{item.example_sentence}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 mt-6">
          <span className="text-sm text-gray-600 font-medium w-12">{index+1}/{total}</span>
          <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#6a5af9] to-[#7b61ff] transition-all duration-300" 
              style={{width:`${Math.round(((index+1)/total)*100)}%`}} />
          </div>
          <span className="text-sm text-gray-600 font-medium w-12 text-right">{Math.round(((index+1)/total)*100)}%</span>
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <button 
            className="px-5 py-2.5 rounded-lg font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
            onClick={()=> { setIndex(i=> Math.max(0,i-1)); setShowAnswer(false); }}>Önceki</button>
          <button 
            className="px-6 py-2.5 rounded-lg font-bold bg-gradient-to-r from-[#6a5af9] to-[#7b61ff] text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            onClick={()=> {
              if(index+1 >= total) { onExit(); return; }
              setIndex(i=> Math.min(total-1,i+1));
              setShowAnswer(false);
            }}>{index+1 >= total ? "Bitir" : "Sonraki"}</button>
          <button 
            className="px-5 py-2.5 rounded-lg font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
            onClick={()=> onExit()}>Çıkış</button>
        </div>

        <div className="flex justify-center items-center gap-4 mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Hız</span>
            <input 
              type="range" min="0.6" max="1.1" step="0.05" 
              value={rate} 
              onChange={e=>setRate(Number(e.target.value))}
              className="w-24 accent-purple-600" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Pitch</span>
            <input 
              type="range" min="0.8" max="1.2" step="0.05" 
              value={pitch} 
              onChange={e=>setPitch(Number(e.target.value))}
              className="w-24 accent-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
