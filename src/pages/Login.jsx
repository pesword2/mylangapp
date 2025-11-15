// src/pages/Login.jsx
import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) navigate("/home", { replace: true });
    });
    return () => unsub();
  }, [navigate]);

  const handleAuthError = (code) => {
    switch (code) {
      case "auth/email-already-in-use": return "Bu email zaten kayıtlı. Lütfen giriş yapın.";
      case "auth/invalid-email": return "Geçersiz email formatı.";
      case "auth/weak-password": return "Şifre zayıf. En az 6 karakter olmalı.";
      case "auth/wrong-password": return "Şifre yanlış. Tekrar deneyin.";
      case "auth/user-not-found": return "Bu email ile kayıtlı kullanıcı yok.";
      case "auth/too-many-requests": return "Çok fazla deneme. Biraz bekleyin ve tekrar deneyin.";
      case "auth/operation-not-allowed": return "Bu giriş yöntemi etkin değil. Firebase Console’dan açın.";
      default: return "Bir hata oluştu. Tekrar deneyin.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/home", { replace: true });
    } catch (err) {
      setError(handleAuthError(err.code || ""));
    } finally {
      setBusy(false);
    }
  };

  const handleAnonymousLogin = async () => {
    setError("");
    setBusy(true);
    try {
      await signInAnonymously(auth);
      navigate("/home", { replace: true });
    } catch (err) {
      setError(handleAuthError(err.code || ""));
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    setBusy(true);
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isRegistering ? "Kayıt Ol" : "Giriş Yap"}</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
            disabled={busy}
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
            minLength={6}
            disabled={busy}
          />
          <button type="submit" style={styles.button} disabled={busy}>
            {busy ? (isRegistering ? "Kayıt yapılıyor..." : "Giriş yapılıyor...") : (isRegistering ? "Kayıt Ol" : "Giriş Yap")}
          </button>
        </form>

        <button onClick={handleAnonymousLogin} style={styles.guestButton} disabled={busy}>
          {busy ? "Bekleyin..." : "Misafir Olarak Devam Et"}
        </button>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
          <button onClick={() => setIsRegistering(false)} style={styles.smallLink} disabled={busy}>Giriş</button>
          <button onClick={() => setIsRegistering(true)} style={styles.smallLink} disabled={busy}>Kayıt</button>
        </div>

        <div style={{ marginTop: 14 }}>
          <button onClick={handleLogout} style={styles.logoutButton} disabled={busy}>Çıkış Yap</button>
        </div>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
  card: { background: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 8px 20px rgba(0,0,0,0.2)", width: "360px", textAlign: "center" },
  title: { marginBottom: "18px", color: "#333", fontWeight: "700" },
  form: { display: "flex", flexDirection: "column" },
  input: { margin: "8px 0", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px" },
  button: { marginTop: "10px", padding: "12px", background: "#4CAF50", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "700" },
  guestButton: { marginTop: "10px", padding: "10px 14px", background: "#888", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "700" },
  logoutButton: { marginTop: "12px", padding: "8px 12px", background: "#E53935", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "700" },
  smallLink: { background: "transparent", border: "none", color: "#4CAF50", cursor: "pointer", fontWeight: "700" },
  error: { marginTop: "14px", color: "red", fontSize: "14px", fontWeight: "600" }
};

export default Login;

