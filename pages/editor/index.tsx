import ComponentSidebar from '@components/ComponentSidebar';
import EditorFrame from '@components/EditorFrame';
import CustomIframe from '@components/Iframe';
import StyledSidebar from '@components/StyleSidebar';
import styled from 'styled-components';

const Editor = () => {
  return (
    <EditorContainer>
      <ComponentSidebar></ComponentSidebar>
      <CustomIframe
        title="drag_drop_editor"
        id="editor_iframe"
        frameBorder="0"
        allowFullScreen
      >
        <EditorFrame />
      </CustomIframe>
      <StyledSidebar></StyledSidebar>
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export default Editor;
