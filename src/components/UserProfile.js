import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    phone: "",
    experience: "",
    militaryStatus: "",
    cvText: "",
  });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProfile(res.data))
      .catch((err) =>
        setMessage(
          "Profil bilgileri alınırken hata oluştu: " +
            (err.response?.data?.message || "Sunucu hatası")
        )
      );
  }, [token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8080/api/user/profile", profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => setMessage("Profil başarıyla güncellendi."))
      .catch((err) =>
        setMessage(
          "Güncelleme hatası: " +
            (err.response?.data?.message || "Sunucu hatası")
        )
      );
  };

  return (
    <div className="container mt-4">
      <h3>Kullanıcı Profilim</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label>Ad Soyad</label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Telefon</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>İş Deneyimi</label>
          <input
            type="text"
            name="experience"
            value={profile.experience}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Askerlik Durumu</label>
          <input
            type="text"
            name="militaryStatus"
            value={profile.militaryStatus}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>CV Metni</label>
          <textarea
            name="cvText"
            value={profile.cvText}
            onChange={handleChange}
            className="form-control"
            rows="5"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Güncelle
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
