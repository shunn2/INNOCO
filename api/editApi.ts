import { createAxiosWithToken } from './customAxios';

class EditApi {
  async editProjectInformation(projectId, informationPayload) {
    const { data } = await createAxiosWithToken().put(
      `/projects/${projectId}`,
      {
        name: informationPayload.projectName,
        status: informationPayload.projectStatus,
        thumbnailUrl: informationPayload.projectThumbnailUrl,
      }
    );
    return data;
  }
  async createInvitationLink(invitationPayload) {
    const { data } = await createAxiosWithToken().post(
      '/invitations',
      invitationPayload
    );
    return data;
  }
  async getProjectParticipants(projectId) {
    const { data } = await createAxiosWithToken().get(
      `/projects/${projectId}/participants`
    );
    return data;
  }
  async deleteParticipant(projectId, auth, user) {
    const params = { auth: auth, user: user };
    const { data } = await createAxiosWithToken().delete(
      `/projects/${projectId}/participants`,
      { params }
    );
    return data;
  }
  async getArchivedProject(projectId) {
    const { data } = await createAxiosWithToken().get(
      `/projects/${projectId}/archived`
    );
    return data;
  }
  async getArchivedPages(projectId) {
    const { data } = await createAxiosWithToken().get(
      `/archived/${projectId}/pages`
    );
    return data;
  }
  async projectRollback(projectId, rollbackId) {
    const params = { archived: rollbackId };
    const { data } = await createAxiosWithToken().put(
      `/projects/${projectId}/roll-back`,
      null,
      { params }
    );
    return data;
  }
  async sendInvitationLink(link, projectName, recipientAddress) {
    const { data } = await createAxiosWithToken().post(
      `/invitations/${link}/send-mail`,
      { projectName: projectName, recipientAddress: recipientAddress }
    );
    return data;
  }
  async sendJoinLink(recipient) {
    const params = { recipient: recipient };
    const { data } = await createAxiosWithToken().post(
      `/users/send-join-mail`,
      null,
      { params }
    );
    return data;
  }
}

const editApi = new EditApi();
export default editApi;
