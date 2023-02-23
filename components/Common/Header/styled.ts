import styled from 'styled-components';
import theme from '@styles/theme';
import Image from 'next/image';

export const HeaderContainer = styled.header`
  min-width: 890px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.color.gray.middle};
  min-width: 700px;
`;

export const LogoImage = styled(Image)`
  width: 120px;
  height: auto;
  background-color: transparent;
  cursor: pointer;
`;

export const LogoutButton = styled.button`
  background-color: ${theme.color.blue.middle};
  color: ${theme.color.white.light};
  padding: 6px 12px;
  border-radius: 6px;
  margin-right: 16px;
  &:hover {
    background-color: ${theme.color.blue.light};
  }
`;
