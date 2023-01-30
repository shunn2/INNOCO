import { createAxiosWithToken } from './customAxios';

class Api {
  async fetchProjects() {
    const { data } = await createAxiosWithToken().get('/projects/list/me');
    return data;
  }
  async postImage() {
    const { data } = await createAxiosWithToken().post('/image/upload');
    return data;
  }
}

const api = new Api();
export default api;
