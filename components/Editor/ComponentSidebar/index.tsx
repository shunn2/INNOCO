import BoxComponent from './Components/box';
import SectionComponent from './Components/section';
import * as Styled from './styled';

const ComponentSidebar = () => {
  return (
    <Styled.ComponentSidebar>
      <SectionComponent />
      <BoxComponent />
    </Styled.ComponentSidebar>
  );
};

export default ComponentSidebar;
