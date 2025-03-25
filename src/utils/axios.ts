import axios, { AxiosRequestConfig } from 'axios';

const axiosServices = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL });

axiosServices.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('serviceToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && !window?.location.href.includes('/login')) {
      window.location.pathname = '/login';
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosServices;

export async function fetcher(args: string | [string, AxiosRequestConfig]) {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.get(url, { ...config });

  return res.data;
}

export async function postFetcher(args: string | [string, AxiosRequestConfig]) {

  const [url, data] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.post(url, data);

  return res.data;
}

export async function putFetcher(url: string, data: any) {
  const res = await axiosServices.put(url, data);
  return res.data;
}

export async function deleteFetcher(args: string | [string, AxiosRequestConfig]) {
  const [url, data] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.delete(url, data);

  return res.data;
}
