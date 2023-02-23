import axios from 'axios';
import { SignInPayload, SignUpPayload } from '@/types/auth';

const HEADERS = {
  'Cache-Control': 'no-cache',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json; charset=utf-8',
};

const createAxiosWithoutToken = (url: string) => {
  return axios.create({
    baseURL: `${process.env.BASE_URL}/${url}`,
  });
};

class AuthApi {
  async signUp(signUpPayload: SignUpPayload) {
    const { data } = await createAxiosWithoutToken('auth').post(
      '/sign-up',
      signUpPayload
    );
    return data;
  }

  async signIn(signInPayload: SignInPayload) {
    const { data } = await createAxiosWithoutToken('auth').post(
      '/sign-in',
      signInPayload
    );
    return data;
  }

  async checkDuplicateId(userLoginId: string) {
    const { data } = await createAxiosWithoutToken('auth').get(
      `/id-check/${userLoginId}`
    );
    return data;
  }
  async checkDuplicateEmail(userEmail: string) {
    const { data } = await createAxiosWithoutToken('auth').get(
      `/email-check/${userEmail}`
    );
    return data;
  }

  async regenerateToken(refreshToken: string) {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/auth/regenerate`,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    return data;
  }
}

const authApi = new AuthApi();
export default authApi;
