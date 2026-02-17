import { Link } from "react-router-dom";
import "./Layout.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <div className="navbar">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <span style={{ marginLeft: "15px" }}>
              👋 {user.name}
            </span>
            <button
              onClick={logout}
              style={{
                marginLeft: "15px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginLeft: "15px" }}>Login</Link>
            <Link to="/register" style={{ marginLeft: "15px" }}>Register</Link>
          </>
        )}
      </div>

      {/* THIS IS THE IMPORTANT PART */}
      <div className="page-content">
        {children}
      </div>
    </>
  );
}

export default Layout;
