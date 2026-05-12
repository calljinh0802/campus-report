import { useEffect, useState } from "react";
import LogoutButton from "../components/LogoutButton.jsx";
import "../App.css";

function MyPage() {
  const currentUser = "student01";
  const [points, setPoints] = useState(0);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const p = Number(localStorage.getItem(`points_${currentUser}`) || 0);
    setPoints(p);

    const all = JSON.parse(localStorage.getItem("reports") || "[]");
    setReports(all.filter(r => r.user === currentUser));
  }, []);

  return (
    <div className="container">
      <LogoutButton />
      
      <h2 className="title">마이페이지</h2>
      <h3>내 포인트: {points}점</h3>
      <hr />

      <h3>내 제보 목록</h3>

      {reports.length === 0 && <p>아직 등록한 제보가 없습니다.</p>}

      {reports.map((r) => (
        <div key={r.id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 15, borderRadius: "8px" }}>
          <p><b>상태:</b> <span style={{
            color: r.status === "승인" ? "green" : r.status === "반려" ? "red" : "black"
          }}>{r.status}</span></p>
          <p><b>위치:</b> {r.location}</p>
          <p><b>설명:</b> {r.desc}</p>
          <div style={{ display: "flex", gap: 10 }}>
            <img src={r.before} style={{ width: 150, borderRadius: "8px" }} />
            <img src={r.after} style={{ width: 150, borderRadius: "8px" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyPage;
