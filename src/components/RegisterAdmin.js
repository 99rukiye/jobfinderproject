// src/components/RegisterAdmin.js
import React, { useState } from "react";
import axios from "axios";

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register/admin", formData);
      setMessage("Şirket kaydı başarılı!");
      setFormData({ companyName: "", email: "", password: "" });
    } catch (error) {
      setMessage("Kayıt başarısız: " + (error.response?.data?.message || "Hata oluştu"));
    }
  };

  return (
    <div className="container mt-5">
      <h3>Şirket Kaydı (Admin)</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          type="text"
          name="companyName"
          placeholder="Şirket Adı"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          type="password"
          name="password"
          placeholder="Şifre"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary">Şirket Kaydet</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default RegisterAdmin;
