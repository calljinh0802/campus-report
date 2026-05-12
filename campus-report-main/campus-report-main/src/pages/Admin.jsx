import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import LogoutButton from "../components/LogoutButton";

function Admin() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const loadReports = async () => {
      const snap = await getDocs(collection(db, "reports"));
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setReports(list);
    };
    loadReports();
  }, []);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "reports", id), { status });
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    alert(`${status} 처리 완료`);
  };

  return (
    <div className="container">
      <LogoutButton />

      <h2 className="title">관리자 제보 검토</h2>

      {reports.map((r) => (
        <div key={r.id} className="admin-card">
          <p><b>상태:</b> {r.status}</p>
          <p><b>설명:</b> {r.desc}</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <img src={r.before} style={{ width: "45%" }} />
            <img src={r.after} style={{ width: "45%" }} />
          </div>

          <div style={{ marginTop: 12 }}>
            <button className="btn" onClick={() => updateStatus(r.id, "승인")}>
              승인
            </button>
            <button
              className="btn btn-sub"
              onClick={() => updateStatus(r.id, "반려")}
            >
              반려
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Admin;
