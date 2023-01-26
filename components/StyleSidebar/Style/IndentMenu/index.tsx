import { withMainData } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
import getCurrentStyle from '@utils/style/getCurrentStyle';
import styleChange from '@utils/style/styleChange';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as Styled from './styled';

const IndentMenu = () => {
  const element = useRecoilValue(elementInfoAtom);
  const [mainData, setMainData] = useRecoilState(withMainData);
  const [indent, setIndent] = useState<IndentProps>({
    paddingTop: '',
    paddingRight: '',
    paddingBottom: '',
    paddingLeft: '',
    marginTop: '',
    marginRight: '',
    marginBottom: '',
    marginLeft: '',
  });
  useEffect(() => {
    setIndent({
      paddingTop:
        getCurrentStyle({ element, type: 'paddingTop', mainData }) || '0',
      paddingRight:
        getCurrentStyle({ element, type: 'paddingRight', mainData }) || '0',
      paddingBottom:
        getCurrentStyle({ element, type: 'paddingBottom', mainData }) || '0',
      paddingLeft:
        getCurrentStyle({ element, type: 'paddingLeft', mainData }) || '0',
      marginTop:
        getCurrentStyle({ element, type: 'marginTop', mainData }) || '0',
      marginRight:
        getCurrentStyle({ element, type: 'marginRight', mainData }) || '0',
      marginBottom:
        getCurrentStyle({ element, type: 'marginBottom', mainData }) || '0',
      marginLeft:
        getCurrentStyle({ element, type: 'marginLeft', mainData }) || '0',
    });
  }, [element]);

  const handleIndentChange = ({ e, type }) => {
    styleChange({ element, type, value: e.target.value, setMainData });
  };
  return (
    <Styled.IndentContainer>
      <Styled.MarginContainer>
        <Styled.IndentTitle>M</Styled.IndentTitle>
        <Styled.IndentBox>
          <Styled.InputBox>
            <Styled.IndentInput
              placeholder={indent.marginTop}
              onChange={(e) => handleIndentChange({ e, type: 'marginTop' })}
            />
          </Styled.InputBox>
        </Styled.IndentBox>
        <Styled.IndentBox>
          <Styled.InputBox>
            <Styled.IndentInput
              placeholder={indent.marginLeft}
              onChange={(e) => handleIndentChange({ e, type: 'marginLeft' })}
            />
          </Styled.InputBox>
          <Styled.PaddingContainer>
            <Styled.IndentTitle type="padding">P</Styled.IndentTitle>
            <Styled.IndentBox>
              <Styled.InputBox>
                <Styled.IndentInput
                  placeholder={indent.paddingTop}
                  onChange={(e) =>
                    handleIndentChange({ e, type: 'paddingTop' })
                  }
                />
              </Styled.InputBox>
            </Styled.IndentBox>
            <Styled.IndentBox>
              <Styled.InputBox>
                <Styled.IndentInput
                  placeholder={indent.paddingLeft}
                  onChange={(e) =>
                    handleIndentChange({ e, type: 'paddingLeft' })
                  }
                />
              </Styled.InputBox>
              <Styled.CenterBorder />
              <Styled.InputBox>
                <Styled.IndentInput
                  placeholder={indent.paddingRight}
                  onChange={(e) =>
                    handleIndentChange({ e, type: 'paddingRight' })
                  }
                />
              </Styled.InputBox>
            </Styled.IndentBox>
            <Styled.IndentBox>
              <Styled.InputBox>
                <Styled.IndentInput
                  placeholder={indent.paddingRight}
                  onChange={(e) =>
                    handleIndentChange({ e, type: 'paddingBottom' })
                  }
                />
              </Styled.InputBox>
            </Styled.IndentBox>
          </Styled.PaddingContainer>
          <Styled.InputBox>
            <Styled.IndentInput
              placeholder={indent.marginRight}
              onChange={(e) => handleIndentChange({ e, type: 'marginRight' })}
            />
          </Styled.InputBox>
        </Styled.IndentBox>
        <Styled.IndentBox>
          <Styled.InputBox>
            <Styled.IndentInput
              placeholder={indent.marginBottom}
              onChange={(e) => handleIndentChange({ e, type: 'marginBottom' })}
            />
          </Styled.InputBox>
        </Styled.IndentBox>
      </Styled.MarginContainer>
    </Styled.IndentContainer>
  );
};

interface IndentProps {
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;
  marginTop: string;
  marginRight: string;
  marginBottom: string;
  marginLeft: string;
}

interface IndentChangeProps {
  e: React.ChangeEvent<HTMLInputElement>;
  type: string;
}

export default IndentMenu;
