import styled from 'styled-components';
import theme from '@styles/theme';
import Image from 'next/image';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.color.gray.middle};
`;

export const LogoImage = styled(Image)`
  width: 120px;
  height: auto;
  background-color: transparent;
`;
