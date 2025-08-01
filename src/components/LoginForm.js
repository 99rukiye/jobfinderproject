import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await authService.login(email, password);
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const role = decoded.role;

      if (role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-page");
      }
    } catch (err) {
      setError("Giriş başarısız. Bilgileri kontrol edin.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Giriş Yap</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Şifre:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Giriş Yap</button>
      </form>
    </div>
  );
};

export default LoginForm;
