import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "./authService";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchUsers = async () => {
    let url = "http://localhost:8080/api/admin/users";
    if (filter === "military") url += "/military";
    else if (filter === "experience") url += "/experience";
    else if (filter === "blocked") url += "/blocked";

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setUsers(response.data.content);
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">Tüm Kullanıcılar</option>
        <option value="military">Askerlik Yapmışlar</option>
        <option value="experience">5 Yıl Deneyimli</option>
        <option value="blocked">Blokeli</option>
      </select>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.fullName} | {u.email} | {u.experience}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
