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
}

const pageApi = new PageApi();
export default pageApi;
