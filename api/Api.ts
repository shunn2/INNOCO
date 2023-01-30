import { createAxiosWithToken } from './customAxios';

class Api {
  async fetchProjects() {
    const { data } = await createAxiosWithToken().get('/projects/list/me');
    return data;
  }
}

const api = new Api();
export default api;
