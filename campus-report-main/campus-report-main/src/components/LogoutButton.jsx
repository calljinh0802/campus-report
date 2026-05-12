import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("currentUser");
      navigate("/");
    }
  };

  return (
    <div style={{ textAlign: "right", marginBottom: "15px" }}>
      <button
        onClick={handleLogout}
        style={{
          background: "#e53935",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "8px 14px",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        로그아웃
      </button>
    </div>
  );
}

export default LogoutButton;
