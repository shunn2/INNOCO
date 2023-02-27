import * as Styled from '../styled';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '@styles/theme';
import { withMainData } from '@recoil/editor';

const HrefMenu = () => {
  const element = useRecoilValue(elementInfoAtom);
  const setMainData = useSetRecoilState(withMainData);
  const [existLink, setExistLink] = useState<string>();
  const handleLink = (e) => {
    setMainData((prev) => {
      const cur = JSON.parse(JSON.stringify(prev));
      cur[element.sectionId].children[element.index].props.href =
        e.target.value;
      return cur;
    });
  };
  useEffect(() => {
    if (element.el.type !== 'section')
      setExistLink(element.el.props.href || '');
  }, [element]);
  return (
    <Styled.PropsBox>
      <Styled.PropsContainer>
        <Styled.Title>Href</Styled.Title>
        <Input placeholder={existLink} size={100} onChange={handleLink} />
      </Styled.PropsContainer>
    </Styled.PropsBox>
  );
};

const Input = styled.input<{ size: number }>`
  width: 220px;
  height: 24px;
  background-color: ${theme.color.gray.middle};
  color: ${theme.color.white.dark};
  padding: 2px 6px;
  margin-left: 12px;
  border-radius: 4px;
  ::placeholder {
    color: ${theme.color.white.dark};
  }
  &:hover {
    background-color: #373c44;
  }
  &:focus {
    border: 2px solid ${theme.color.blue.light};
    outline-color: ${theme.color.blue.light};
  }
`;

export default HrefMenu;
