import axios from 'axios';

const api = axios.create({
  baseURL: "https://lead-management-system-api-omega.vercel.app/api",
  withCredentials: true
});

// Optional: redirect on 401
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
