import { PropsWithChildren, useState } from 'react';
import * as Styled from './styled';

export interface ToggleMenuProps {
  title: string;
}
const ToggleMenu = (props: PropsWithChildren<ToggleMenuProps>) => {
  const { children, title, ...rest } = props;
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const handleToggleMenu = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (
    <>
      <Styled.ToggleMenuContainer
        title={title}
        onClick={handleToggleMenu}
        {...rest}
      >
        <Styled.Title>{title}</Styled.Title>
        <></>
      </Styled.ToggleMenuContainer>
      {isToggleOpen && <Styled.ToggledMenu>{children}</Styled.ToggledMenu>}
    </>
  );
};

export default ToggleMenu;
