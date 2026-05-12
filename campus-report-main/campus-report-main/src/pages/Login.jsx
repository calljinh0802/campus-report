import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = async () => {
    try {
      const email = `${id}@campus.local`;
      const userCred = await signInWithEmailAndPassword(auth, email, pw);

      // Firestore에서 유저 역할 가져오기
      const snap = await getDoc(doc(db, "users", userCred.user.uid));
      const data = snap.data();

      if (data.role === "admin") navigate("/admin");
      else navigate("/report");
    } catch (err) {
      alert("로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">로그인</h2>

      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />

      <button className="btn" onClick={handleLogin}>로그인</button>
    </div>
  );
}

export default Login;
