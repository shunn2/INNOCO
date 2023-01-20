import TextComponent from './Components/text';
import SectionComponent from './Components/section';
import * as Styled from './styled';
import ButtonComponent from './Components/button';
import LinkComponent from './Components/link';

const ComponentSidebar = () => {
  return (
    <Styled.ComponentSidebar>
      <Styled.Category>
        <Styled.CategoryTitle>PRIMITIVES</Styled.CategoryTitle>
        <SectionComponent />
        <TextComponent />
        <ButtonComponent />
        <LinkComponent />
      </Styled.Category>
    </Styled.ComponentSidebar>
  );
};

export default ComponentSidebar;
