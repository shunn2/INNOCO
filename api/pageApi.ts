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
  async getPageList(projectId) {
    const { data } = await createAxiosWithToken().get(
      `/projects/${projectId}/pages`
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
    const { data } = await createAxiosWithToken().put(
      `/projects/${projectId}/overwrite`
    );
  }
  async changePageName(projectId, pageId, pageName) {
    const { data } = await createAxiosWithToken().put(
      `/projects/${projectId}/pages/${pageId}/name`,
      null,
      { params: { name: pageName } }
    );
    return data;
  }
  async changePageMain(before, after) {
    const params = { before, after };
    const { data } = await createAxiosWithToken().put(
      `/pages/change-main`,
      null,
      { params: params }
    );
    return data;
  }
  async deletePage(pageId) {
    const { data } = await createAxiosWithToken().delete(`/pages/${pageId}`);
    return data;
  }
}

const pageApi = new PageApi();
export default pageApi;
