export interface Project {
  projectId: string;
  projectName: string;
  projectStatus: string;
  projectAuthority: string;
  projectThumbnailUrl: string;
  projectOwnerLoginId: string;
  projectVersion: number | null;
  publishedDate: string | null;
  synced: boolean;
}

export interface Projects {
  code: number;
  messsage: string;
  value: {
    projects: Project[];
  };
}
