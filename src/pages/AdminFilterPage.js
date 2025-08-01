import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminFilterPage = () => {
  const [users, setUsers] = useState([]);
  const [militaryStatusFilter, setMilitaryStatusFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');

  const handleFilter = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/all", {
        params: {
          militaryStatus: militaryStatusFilter,
          experience: experienceFilter,
        },
      });
      setUsers(response.data.content || []);
    } catch (error) {
      console.error("Admin filtreleme hatası:", error);
    }
  };

useEffect(() => {
  handleFilter();
}, [handleFilter]);


  return (
    <div className="container mt-4">
      <h2>Kullanıcıları Filtrele (Admin Paneli)</h2>
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <select
            className="form-select"
            value={militaryStatusFilter}
            onChange={(e) => setMilitaryStatusFilter(e.target.value)}
          >
            <option value="">Askerlik Durumu</option>
            <option value="yapıldı">Yapıldı</option>
            <option value="yapılmadı">Yapılmadı</option>
            <option value="tecilli">Tecilli</option>
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Deneyim örn: 5 yıl"
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <button onClick={handleFilter} className="btn btn-success w-100">
            Filtrele
          </button>
        </div>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>Telefon</th>
            <th>Deneyim</th>
            <th>Askerlik</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.phone}</td>
                <td>{user.experience}</td>
                <td>{user.militaryStatus}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                Uygun kullanıcı bulunamadı.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFilterPage;
