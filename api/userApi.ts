import { createAxiosWithToken } from './customAxios';

class UserApi {
  async getCurrentUser() {
    const { data } = await createAxiosWithToken().get(`/users/current`);
    return data;
  }
}

const userApi = new UserApi();
export default userApi;
