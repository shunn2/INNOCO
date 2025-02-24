import { SvgIcon } from '@components/Common';
import { PropsWithChildren, useState } from 'react';
import * as Styled from './styled';

export interface ToggleMenuProps {
  title: string;
}
const ToggleMenu = (props: PropsWithChildren<ToggleMenuProps>) => {
  const { children, title, ...rest } = props;
  const [isToggleOpen, setIsToggleOpen] = useState(true);
  const handleToggleMenu = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  return (
    <Styled.ToggleMenuContainer title={title} {...rest}>
      <Styled.ToggledMenu onClick={handleToggleMenu}>
        <Styled.Title>
          {title}
          <SvgIcon type="down-icon" size={18} />
        </Styled.Title>
      </Styled.ToggledMenu>
      {isToggleOpen && (
        <Styled.ToggleContents>{children}</Styled.ToggleContents>
      )}
    </Styled.ToggleMenuContainer>
  );
};

export default ToggleMenu;
