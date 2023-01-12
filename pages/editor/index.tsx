import ComponentSidebar from '@components/ComponentSidebar';
import CustomIframe from '@components/Editor/Customframe';
import EditorFrame from '@components/Editor/EditorFrame';
import StyleSidebar from '@components/StyleSidebar';
import styled from 'styled-components';

const Editor = () => {
  return (
    <EditorContainer>
      <ComponentSidebar />
      <CustomIframe title="drag_drop_editor" id="editor_iframe" frameBorder="0">
        <EditorFrame />
      </CustomIframe>
      <StyleSidebar />
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export default Editor;
