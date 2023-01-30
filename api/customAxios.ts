import axios, { AxiosInstance } from 'axios';

const BASE_URL = process.env.BASE_URL;
const HEADERS = {
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json; charset=utf-8',
};

const axiosInstanceWithToken = axios.create({
  baseURL: `${BASE_URL}`,
  headers: HEADERS,
  withCredentials: true,
});

const createAxiosWithToken = (): AxiosInstance => {
  const accessToken = getToken();

  setAuthorizationHeader(JSON.parse(accessToken));
  return axiosInstanceWithToken;
};

const setAuthorizationHeader = (token: string) => {
  axiosInstanceWithToken.defaults.headers['Authorization'] = `Bearer ${token}`;
};

const getToken = () => {
  const accessToken = window.localStorage.getItem('access_token');
  return accessToken;
};

export { createAxiosWithToken, setAuthorizationHeader };
