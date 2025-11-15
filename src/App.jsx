// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Practice from "./pages/Practice";
import Stats from "./pages/Stats";

// Basit ProtectedRoute: user varsa children render, yoksa /login'e yönlendir
function ProtectedRoute({ user, children }) {
  if (user === null) return null;           // auth henüz belirlenmedi => nothing (loading)
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setInitialized(true);
    });
    return () => unsub();
  }, []);

  // Basit loading ekranı auth kontrolü bitene kadar
  if (!initialized) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", background: "linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)",
        color: "#fff", fontWeight: "700"
      }}>
        Yükleniyor...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Root artık login sayfasını gösterecek */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login sayfası */}
        <Route path="/login" element={<Login />} />

        {/* Korunan sayfalar: sadece oturum varsa erişim */}
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Home user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice"
          element={
            <ProtectedRoute user={user}>
              <Practice user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stats"
          element={
            <ProtectedRoute user={user}>
              <Stats user={user} />
            </ProtectedRoute>
          }
        />

        {/* Diğer tüm bilinmeyen rotaları login'e yönlendir */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

