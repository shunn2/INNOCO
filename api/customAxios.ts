import { useSession } from '@lib/next-auth-react-query';
import axios, { AxiosInstance } from 'axios';

const BASE_URL = process.env.BASE_URL;
const [session, _] = useSession();
const HEADERS = {
  'Cache-Control': 'no-cache',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json; charset=utf-8',
  Authorization: `Bearer ${JSON.parse(session.accessToken)}`,
};

const createAxiosWithToken = (url: string): AxiosInstance => {
  return axios.create({
    baseURL: `${BASE_URL}/${url}`,
    headers: HEADERS,
    withCredentials: true,
  });
};

export default createAxiosWithToken;
