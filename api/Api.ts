import { createAxiosWithToken } from './customAxios';

class Api {
  async fetchProjects() {
    const { data } = await createAxiosWithToken().get('/projects/list/me');
    return data;
  }
  async fetchSingleProject(projectId) {
    const { data } = await createAxiosWithToken().get(`/projects/${projectId}`);
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
  async publishProject(projectId) {
    const { data } = await createAxiosWithToken().get(
      `/projects/${projectId}/publish`
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
  async startEditSync(projectId) {
    const { data } = await createAxiosWithToken().get(
      `/projects/${projectId}/edit`
    );
    return data;
  }
  async getProjectSync(projectId) {
    const { data } = await createAxiosWithToken().get(
      `/projects/${projectId}/status-check`
    );
    return data;
  }
  async checkProjectAuth(projectId, auth) {
    const { data } = await createAxiosWithToken().get(
      `/projects/${projectId}/auth-check=${auth}`
    );
    return data;
  }
  async getInvitationList(userId) {
    const { data } = await createAxiosWithToken().get(
      `/users/${userId}/invitations`
    );
    return data;
  }
  async acceptInvitation(invitationId) {
    const { data } = await createAxiosWithToken().get(
      `/invitations/${invitationId}/accept`
    );
    return data;
  }
  async acceptAllInvitation(userId) {
    const { data } = await createAxiosWithToken().get(
      `/users/${userId}/invitations/accept`
    );
    return data;
  }
  async overWritePage(projectId) {
    const { data } = await createAxiosWithToken().put(
      `/projects/${projectId}/overwrite`
    );
    return data;
  }
  async getProjectUrl(projectId) {
    const { data } = await createAxiosWithToken().get(
      `/projects/${projectId}/url`
    );
    console.log(data);

    return data;
  }
}

const api = new Api();
export default api;
