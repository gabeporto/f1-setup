import axios from 'axios';

const axiosF1Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_F1_API_BASE_URL,
  timeout: 10000,
});

export default axiosF1Instance;