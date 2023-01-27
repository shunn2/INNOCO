import { createAxiosWithToken } from './customAxios';

class Api {
  async fetchProjects() {
    const { data } = await createAxiosWithToken().get('/projects/current/me');
    return data;
  }
}

const api = new Api();
export default api;
