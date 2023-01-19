import TextComponent from './Components/text';
import SectionComponent from './Components/section';
import * as Styled from './styled';

const ComponentSidebar = () => {
  return (
    <Styled.ComponentSidebar>
      <Styled.Category>
        <Styled.CategoryTitle>PRIMITIVES</Styled.CategoryTitle>
        <SectionComponent />
        <TextComponent />
      </Styled.Category>
    </Styled.ComponentSidebar>
  );
};

export default ComponentSidebar;
