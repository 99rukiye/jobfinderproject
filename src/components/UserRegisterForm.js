import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getRoleFromToken } from '../services/authService'; // 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });

      const token = response.data.token || response.data; // JWT string olarak dönüyorsa fallback

      localStorage.setItem('token', token); //  Tokenı kaydet

      const role = getRoleFromToken(token); //  Token'dan rolü al

      setMessage('Giriş başarılı!');

      // ✅ Role göre yönlendirme
      if (role === 'ADMIN' || role === 'ROLE_ADMIN') {
        navigate('/admin');
      } else if (role === 'USER' || role === 'ROLE_USER') {
        navigate('/user');
      } else {
        navigate('/home'); // rol tanımsızsa default
      }
    } catch (error) {
      console.error(error);
      setMessage('Giriş başarısız: ' + (error.response?.data?.message || 'Sunucu hatası'));
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Giriş Yap</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
