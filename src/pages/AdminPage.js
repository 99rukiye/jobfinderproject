// src/components/AdminPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import authService from "../services/authService";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  const token = authService.getToken();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let url = "http://localhost:8080/api/admin/users";

        if (filter === "military") {
          url = "http://localhost:8080/api/admin/users/military";
        } else if (filter === "experience") {
          url = "http://localhost:8080/api/admin/users/experience";
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data.content || response.data); // pageable varsa .content
      } catch (error) {
        console.error("Kullanıcılar alınamadı:", error);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [filter, token]);

  return (
    <div className="container">
      <h2>Admin Kullanıcı Paneli</h2>

      <div className="mb-3">
        <label>Filtre Seç:</label>
        <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Tüm Kullanıcılar</option>
          <option value="military">Askerliği Yapılmış Olanlar</option>
          <option value="experience">5 Yıl Deneyimli Olanlar</option>
        </select>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Deneyim</th>
            <th>Askerlik</th>
            <th>CV</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.experience}</td>
              <td>{u.militaryStatus}</td>
              <td>{u.cvText}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
