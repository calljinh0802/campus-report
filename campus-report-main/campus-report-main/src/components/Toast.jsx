import { useEffect } from "react";

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: "25px",
        right: "25px",
        background: "#333",
        color: "white",
        padding: "10px 18px",
        borderRadius: "8px",
        fontSize: "14px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        animation: "fadein 0.3s",
        zIndex: 1000
      }}
    >
      {message}
    </div>
  );
}

export default Toast;
