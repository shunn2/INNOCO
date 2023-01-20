import TextComponent from './Components/text';
import SectionComponent from './Components/section';
import * as Styled from './styled';
import ButtonComponent from './Components/button';

const ComponentSidebar = () => {
  return (
    <Styled.ComponentSidebar>
      <Styled.Category>
        <Styled.CategoryTitle>PRIMITIVES</Styled.CategoryTitle>
        <SectionComponent />
        <TextComponent />
        <ButtonComponent />
      </Styled.Category>
    </Styled.ComponentSidebar>
  );
};

export default ComponentSidebar;
