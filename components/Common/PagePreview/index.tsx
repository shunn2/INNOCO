import CustomIframe from '@components/Editor/Customframe';

interface PagePreviewProps {
  id: string;
  projectId: string;
  pageId: string;
}

const PagePreview = (props: PagePreviewProps) => {
  const { id, projectId, pageId } = props;
  return (
    <iframe
      src={`http://${id}/innoco-page.onstove.com/${projectId}/${pageId}`}
      width={100}
      height={100}
    />
  );
};

export default PagePreview;
