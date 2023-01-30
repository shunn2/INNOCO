import { createAxiosWithToken } from './customAxios';

class Api {
  async fetchProjects() {
    const { data } = await createAxiosWithToken().get('/projects/list/me');
    return data;
  }
  async postImage(multipartFile) {
    const { data } = await createAxiosWithToken().post(
      '/image/upload',
      {
        multipartFile,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  }
}

const api = new Api();
export default api;
