import axios, { AxiosInstance } from 'axios';
import jwt_decode from 'jwt-decode';
import authApi from './authApi';

interface AuthToken {
  sub: string;
  role: string;
  'token-type': string;
  iat: number;
  exp: number;
}

const BASE_URL = process.env.BASE_URL;
const HEADERS = {
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
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
  const accessToken = localStorage.getItem('access_token');
  return accessToken;
};

// axiosInstanceWithToken.interceptors.request.use(
//   async (config) => {
//     if (!config.headers) return config;
//     const access_token = localStorage.getItem('access_token');
//     const refresh_token = JSON.parse(localStorage.getItem('refresh_token'));
//     const decodedAccess: AuthToken = jwt_decode(access_token);
//     if (decodedAccess.exp < Date.now() / 1000) {
//       const res = await authApi.regenerateToken(refresh_token);
//       const { accessToken, refreshToken } = res.value;
//       localStorage.setItem('access_token', JSON.stringify(accessToken));
//       localStorage.setItem('refresh_token', JSON.stringify(refreshToken));
//       config.headers['Authorization'] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstanceWithToken.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;
//     if (status === 401) {
//       const originalRequest = config;
//       const refresh_token = await localStorage.getItem('refresh_token');
//       const res = await authApi.regenerateToken(refresh_token);
//       console.log('res', res);
//       const { accessToken, refreshToken } = res.value;
//       await localStorage.multiSet([
//         ['access_token', accessToken],
//         ['refresh_token', refreshToken],
//       ]);
//       originalRequest.headers.authorization = `Bearer ${accessToken}`;
//       return axios(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

export { createAxiosWithToken, setAuthorizationHeader };
