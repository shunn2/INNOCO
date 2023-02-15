import TextComponent from './Components/text';
import SectionComponent from './Components/section';
import * as Styled from './styled';
import ButtonComponent from './Components/button';
import LinkComponent from './Components/link';
import ImageComponent from './Components/image';
import GuestBookComponent from './Components/guestBook';

const ComponentSidebar = () => {
  return (
    <Styled.ComponentSidebar>
      <Styled.Category>
        <Styled.CategoryTitle>PRIMITIVES</Styled.CategoryTitle>
        <SectionComponent />
        <TextComponent />
        <ButtonComponent />
        <LinkComponent />
        <ImageComponent />
      </Styled.Category>
      <Styled.Category>
        <Styled.CategoryTitle>DATA COMPONENT</Styled.CategoryTitle>
        <GuestBookComponent />
      </Styled.Category>
    </Styled.ComponentSidebar>
  );
};

export default ComponentSidebar;
