import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "../App.css";

function SignUp() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [role, setRole] = useState("student");
  const [adminKey, setAdminKey] = useState("");

  const ADMIN_SECRET = "campus2024!";

  const handleSignUp = async () => {
    if (!id || !pw) return alert("아이디와 비밀번호를 입력해주세요.");
    if (pw !== confirmPw) return alert("비밀번호가 일치하지 않습니다.");

    if (role === "admin" && adminKey !== ADMIN_SECRET)
      return alert("관리자 인증 코드가 올바르지 않습니다.");

    try {
      const email = `${id}@campus.local`; // 이메일 형식 강제
      const userCred = await createUserWithEmailAndPassword(auth, email, pw);

      // Firestore에 유저 역할 저장
      await setDoc(doc(db, "users", userCred.user.uid), {
        id,
        role,
        createdAt: new Date()
      });

      alert("회원가입 완료!");
      window.location.href = "/"; // 로그인 페이지로 이동
    } catch (err) {
      console.error(err);
      alert("회원가입 실패: " + err.message);
    }
  };

  return (
    <div className="container">
      <h2 className="title">회원가입</h2>

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

      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPw}
        onChange={(e) => setConfirmPw(e.target.value)}
      />

      <p style={{ marginTop: "10px", marginBottom: "5px" }}>계정 유형</p>

      <label>
        <input
          type="radio"
          checked={role === "student"}
          onChange={() => setRole("student")}
        />
        학생
      </label>
      <br />
      <label>
        <input
          type="radio"
          checked={role === "admin"}
          onChange={() => setRole("admin")}
        />
        관리자
      </label>

      {role === "admin" && (
        <div>
          <input
            type="password"
            placeholder="관리자 인증 코드"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
          />
        </div>
      )}

      <button className="btn" onClick={handleSignUp}>
        회원가입
      </button>
    </div>
  );
}

export default SignUp;
