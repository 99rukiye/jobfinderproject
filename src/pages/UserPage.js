// src/components/UserPage.js
import React, { useEffect, useState } from "react";
import authService from "../services/authService";

const UserPage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Profil getirme hatası:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>Yükleniyor...</p>;

  return (
    <div className="container mt-5">
      <h2>Hoş geldiniz, {profile.fullName}</h2>
      <ul className="list-group mt-4">
        <li className="list-group-item"><strong>Email:</strong> {profile.email}</li>
        <li className="list-group-item"><strong>Telefon:</strong> {profile.phone}</li>
        <li className="list-group-item"><strong>Deneyim:</strong> {profile.experience}</li>
        <li className="list-group-item"><strong>Askerlik Durumu:</strong> {profile.militaryStatus}</li>
        <li className="list-group-item"><strong>CV:</strong> {profile.cvText}</li>
      </ul>
    </div>
  );
};

export default UserPage;
