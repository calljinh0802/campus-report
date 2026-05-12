import { useState } from "react";
import { auth, db, storage } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import LogoutButton from "../components/LogoutButton";

function Report() {
  const [beforeFile, setBeforeFile] = useState(null);
  const [afterFile, setAfterFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file) => {
    const fileRef = ref(storage, `reports/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  const handleSubmit = async () => {
    if (!beforeFile || !afterFile || !desc) {
      alert("Before / After / 설명은 필수입니다.");
      return;
    }

    try {
      setLoading(true);

      const beforeURL = await uploadImage(beforeFile);
      const afterURL = await uploadImage(afterFile);

      await addDoc(collection(db, "reports"), {
        user: auth.currentUser.uid,
        before: beforeURL,
        after: afterURL,
        desc,
        location,
        status: "대기",
        createdAt: Timestamp.now(),
      });

      alert("제보 등록 완료!");
      window.location.href = "/mypage";
    } catch (err) {
      console.error(err);
      alert("등록 실패: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <LogoutButton />

      <h2 className="title">제보 등록</h2>

      <p>Before 사진</p>
      <input type="file" onChange={(e) => setBeforeFile(e.target.files[0])} />

      <p>After 사진</p>
      <input type="file" onChange={(e) => setAfterFile(e.target.files[0])} />

      <p>설명</p>
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />

      <p>위치</p>
      <input value={location} onChange={(e) => setLocation(e.target.value)} />

      <button className="btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "업로드 중..." : "제보 제출"}
      </button>
    </div>
  );
}

export default Report;
