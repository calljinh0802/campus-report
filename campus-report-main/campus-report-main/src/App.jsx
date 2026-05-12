import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Report from "./pages/Report";
import Admin from "./pages/Admin";
import MyPage from "./pages/Mypage";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <p>로딩 중...</p>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Navigate to="/report" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/report" element={user ? <Report /> : <Navigate to="/" />} />
        <Route path="/mypage" element={user ? <MyPage /> : <Navigate to="/" />} />
        <Route path="/admin" element={user ? <Admin /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
