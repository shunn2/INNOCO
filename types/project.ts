export interface Project {
  projectId: number;
  projectName: string;
  projectStatus: string;
  projectAuthority: string;
  projectThumbnailUrl: string;
  mainPageId: string;
  createdDate: string;
  modifiedDate: string;
}

export interface Projects {
  code: number;
  messsage: string;
  value: {
    projects: Project[];
  };
}
