export interface Template {
  templateId: string;
  templateName: string;
  templateThumbnailUrl: string;
}

export interface Templates {
  code: number;
  messsage: string;
  value: Template[];
}
