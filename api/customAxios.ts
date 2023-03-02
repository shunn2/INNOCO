import axios, { AxiosInstance } from 'axios';
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

let isAlreadyFetchingAccessToken = false;
let pendingRequest = [];

const addPendingRequest = (callback) => {
  pendingRequest.push(callback);
};

const onAccessTokenFetched = (accessToken) => {
  pendingRequest.forEach((callback) => callback(accessToken));
  pendingRequest = [];
};

const signOut = () => {
  localStorage.removeItem('access_token');
  window.location.replace('/auth/sign-in');
};

axiosInstanceWithToken.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401 || status === 403) {
      try {
        const originalRequest = config;

        const retryOriginalRequest = new Promise((resolve, reject) => {
          addPendingRequest(async (accessToken) => {
            try {
              config.headers['Authorization'] = 'Bearer ' + accessToken;
              resolve(axios(originalRequest));
            } catch (err) {
              reject(err);
            }
          });
        });

        const refresh_token = JSON.parse(localStorage.getItem('refresh_token'));
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true;

          const res = await authApi.regenerateToken(refresh_token);
          if (!res.value) {
            signOut();
            return;
          }

          const { accessToken, refreshToken } = res.value;
          localStorage.setItem('access_token', JSON.stringify(accessToken));
          localStorage.setItem('refresh_token', JSON.stringify(refreshToken));
          isAlreadyFetchingAccessToken = false;
          onAccessTokenFetched(accessToken);
        }
        return retryOriginalRequest;
      } catch (err) {
        signOut();
        return Promise.reject(err);
      }
    }
  }
);

export { createAxiosWithToken, setAuthorizationHeader };
