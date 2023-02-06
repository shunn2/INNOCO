import { createAxiosWithToken } from './customAxios';

class Api {
  async fetchProjects() {
    const { data } = await createAxiosWithToken().get('/projects/list/me');
    return data;
  }
  async fetchTemplates() {
    const { data } = await createAxiosWithToken().get('/templates');
    return data;
  }
  async createProject(projectName, projectThumbnailUrl) {
    const { data } = await createAxiosWithToken().post('/projects', {
      projectName,
      projectThumbnailUrl,
    });
    return data;
  }
  async deleteProject(projectId) {
    const { data } = await createAxiosWithToken().delete(
      `/projects/${projectId}`
    );
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
  async getProjectSync(projectId) {
    const { data } = await createAxiosWithToken().get(
      `projects/${projectId}/sync-check`
    );
    return data;
  }
  async checkProjectAuth(projectId, auth) {
    const { data } = await createAxiosWithToken().get(
      `projects/${projectId}/auth-check=${auth}`
    );
    return data;
  }
}

const api = new Api();
export default api;
