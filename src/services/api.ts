import axios, { type AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    const errors = error.response?.data?.errors;
    return Promise.reject({
      ...error,
      message,
      errors,
      statusCode: error.response?.status || 500,
    });
  }
);

export default api;
