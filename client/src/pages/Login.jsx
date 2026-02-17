import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "./Auth.css";




function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", {
        email,
        password
      });

      localStorage.setItem("token", response.data.token);
      setUser({ name: email.split("@")[0] });
      toast.success("Login successful!");



      navigate("/");
    } catch (error) {
       toast.error(error.response?.data?.message || "Login failed");

    }
  };

 return (
  <div className="auth-wrapper">
    <form onSubmit={handleLogin} className="auth-card">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  </div>
);

}

export default Login;
