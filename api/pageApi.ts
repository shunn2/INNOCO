import { createAxiosWithToken } from './customAxios';

class PageApi {
  async createPage(projectId, name, template) {
    const { data } = await createAxiosWithToken().post(
      `/projects/${projectId}/pages`,
      null,
      { params: { name, template } }
    );
    return data;
  }
  async getPageList(projectId, source) {
    const { data } = await createAxiosWithToken().get(
      `/projects/${projectId}/pages`,
      { params: { source } }
    );
    return data;
  }
  async getPageForEditor(projectId, pageId) {
    const { data } = await createAxiosWithToken().get(
      `/projects/${projectId}/pages/${pageId}`
    );
    return JSON.parse(data.value.pageJson);
  }
  async overWritePage(projectId) {
    const { data } = await createAxiosWithToken().get(
      `/projects/${projectId}/overwrite`
    );
  }
}

const pageApi = new PageApi();
export default pageApi;
