import TextComponent from './Components/text';
import SectionComponent from './Components/section';
import * as Styled from './styled';

const ComponentSidebar = () => {
  return (
    <Styled.ComponentSidebar>
      <SectionComponent />
      <TextComponent />
    </Styled.ComponentSidebar>
  );
};

export default ComponentSidebar;
