import axios, { AxiosInstance } from 'axios';

const BASE_URL = process.env.BASE_URL;
const ACCESS_TOKEN = window.localStorage.getItem('access_token');
const HEADERS = {
  'Cache-Control': 'no-cache',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json; charset=utf-8',
  Authorization: `Bearer ${JSON.parse(ACCESS_TOKEN)}`,
};

const createAxiosWithToken = (url: string): AxiosInstance => {
  return axios.create({
    baseURL: `${BASE_URL}/${url}`,
    headers: HEADERS,
    withCredentials: true,
  });
};

export default createAxiosWithToken;
