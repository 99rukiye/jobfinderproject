import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserFilterPage = () => {
  const [users, setUsers] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState('');
  const [militaryStatusFilter, setMilitaryStatusFilter] = useState('');

  const handleFilter = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/all", {
        params: {
          experience: experienceFilter,
          militaryStatus: militaryStatusFilter,
        },
      });
      setUsers(response.data.content || []);
    } catch (error) {
      console.error("Filtreleme sırasında hata oluştu:", error);
    }
  };

  useEffect(() => {
    handleFilter();
  }, []);

  return (
    <div className="container mt-4">
      <h2>İşverenleri Filtrele</h2>
      <div className="row g-3">
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
          <button onClick={handleFilter} className="btn btn-primary w-100">
            Filtrele
          </button>
        </div>
      </div>

      <table className="table table-bordered table-hover mt-4">
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>Telefon</th>
            <th>Deneyim</th>
            <th>Askerlik Durumu</th>
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
                Uygun kayıt bulunamadı.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserFilterPage;
