// src/components/Register.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    experience: "",
    militaryStatus: "",
    cvText: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register/user", formData);
      setMessage("Kayıt başarılı!");
      navigate("/login"); // başarılıysa login sayfasına yönlendir
    } catch (error) {
      setMessage("Kayıt başarısız: " + (error.response?.data?.message || "Sunucu hatası"));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Kayıt Ol</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Ad Soyad" className="form-control my-2" onChange={handleChange} />
        <input name="email" type="email" placeholder="E-mail" className="form-control my-2" onChange={handleChange} />
        <input name="password" type="password" placeholder="Şifre" className="form-control my-2" onChange={handleChange} />
        <input name="phone" placeholder="Telefon" className="form-control my-2" onChange={handleChange} />
        <input name="experience" placeholder="İş Deneyimi (örnek: 5 yıl)" className="form-control my-2" onChange={handleChange} />
        <input name="militaryStatus" placeholder="Askerlik Durumu (yapıldı/yapılmadı)" className="form-control my-2" onChange={handleChange} />
        <textarea name="cvText" placeholder="Kendini Tanıt (CV Metni)" className="form-control my-2" rows={4} onChange={handleChange}></textarea>
        <button type="submit" className="btn btn-primary mt-2">Kayıt Ol</button>
      </form>
    </div>
  );
};

export default Register;
