// src/pages/HomePage.js
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>İş Bulma Uygulamasına Hoş Geldiniz</h1>
      <p>Lütfen giriş yaparak devam ediniz.</p>
      <p><Link to="/login">Giriş Yap</Link></p>
      <p>Hesabınız yok mu? <Link to="/register">Kayıt Ol</Link></p>
    </div>
  );
};

export default HomePage;
