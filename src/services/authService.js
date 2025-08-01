import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

// Token'ı localStorage'a kaydeder
const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Token'ı getirir
const getToken = () => {
  return localStorage.getItem("token");
};

// Token'ı siler
const removeToken = () => {
  localStorage.removeItem("token");
};

// Giriş işlemi
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  const token = response.data;
  setToken(token);
  return token;
};

// Kullanıcı profili (JWT ile)
const getProfile = async () => {
  const token = getToken();
  const response = await axios.get("http://localhost:8080/api/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Token içinden kullanıcı rolünü al
const getRoleFromToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || payload.roles?.[0]?.authority || null;
  } catch (e) {
    return null;
  }
};

// Token'ı localStorage'dan alıp rolü çözümle
const getUserRoleFromToken = () => {
  const token = getToken();
  if (!token) return null;
  return getRoleFromToken(token);
};

// Logout işlemi
const logout = () => {
  removeToken();
  window.location.href = "/login";
};

// Tüm fonksiyonları tek bir objede topla
const authService = {
  login,
  getToken,
  removeToken,
  getProfile,
  getRoleFromToken,
  getUserRoleFromToken,
  logout,
};

export default authService;
