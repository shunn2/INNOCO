import ComponentSidebar from '@components/Editor/ComponentSidebar';
import EditorFrame from '@components/Editor/EditorFrame';
import CustomIframe from '@components/Editor/Customframe';
import StyledSidebar from '@components/Editor/StyleSidebar';
import styled from 'styled-components';

const Editor = () => {
  return (
    <EditorContainer>
      <ComponentSidebar />
      <CustomIframe title="drag_drop_editor" id="editor_iframe" frameBorder="0">
        <EditorFrame />
      </CustomIframe>
      <StyledSidebar />
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export default Editor;
