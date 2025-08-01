// src/components/RegisterUser.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    experience: "",
    militaryStatus: "",
    cvText: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register/user", formData);
      setMessage("Kayıt başarılı. Giriş yapabilirsiniz.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Kayıt başarısız.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Kullanıcı Kaydı</h2>
      <form onSubmit={handleRegister}>
        <input name="fullName" placeholder="Ad Soyad" required onChange={handleChange} className="form-control mb-2" />
        <input name="email" placeholder="Email" type="email" required onChange={handleChange} className="form-control mb-2" />
        <input name="password" placeholder="Şifre" type="password" required onChange={handleChange} className="form-control mb-2" />
        <input name="phone" placeholder="Telefon" onChange={handleChange} className="form-control mb-2" />
        <input name="experience" placeholder="Deneyim (örn: 5 yıl)" onChange={handleChange} className="form-control mb-2" />
        <select name="militaryStatus" onChange={handleChange} className="form-control mb-2">
          <option value="">Askerlik Durumu</option>
          <option value="yapıldı">Yapıldı</option>
          <option value="muaf">Muaf</option>
          <option value="yapılmadı">Yapılmadı</option>
        </select>
        <textarea name="cvText" placeholder="CV Bilgisi" onChange={handleChange} className="form-control mb-2" />
        <button className="btn btn-success">Kayıt Ol</button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default RegisterUser;
