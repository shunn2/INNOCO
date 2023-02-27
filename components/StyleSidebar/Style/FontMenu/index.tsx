import { useRecoilState, useRecoilValue } from 'recoil';
import { withMainData } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
import { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import * as Styled from '../styled';
import getCurrentStyle from '@utils/style/getCurrentStyle';
import styleChange from '@utils/style/styleChange';
import { Select, SvgIcon } from '@components/Common';
import StyleInput from '@components/Common/StyleInput';

interface FontInterface {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
  textAlign: string;
  textTransform: string;
  textDecoration: string;
}

interface FontChangeProps {
  e?: React.MouseEvent;
  type: string;
  value: string;
}

const fontFamilyOptions = [
  { title: 'Sans-serif', value: 'sans-serif' },
  { title: 'Georgia', value: 'georgia' },
  { title: 'Serif', value: 'serif' },
  { title: 'Cursive', value: 'cursive' },
  { title: 'Inherit', value: 'inherit' },
  { title: 'Initial', value: 'initial' },
];
const fontStyleOptions = [
  { title: 'normal', value: 'normal' },
  { title: 'italic', value: 'italic' },
  { title: 'oblique', value: 'oblique' },
];
const textAlignProperty = [
  { value: 'left' },
  { value: 'center' },
  { value: 'right' },
];
const textTransformProperty = [{ value: 'uppercase' }, { value: 'lowercase' }];
const textDecorationProperty = [
  { value: 'underline' },
  { value: 'line-through' },
];

const FontMenu = () => {
  const element = useRecoilValue(elementInfoAtom);
  const [mainData, setMainData] = useRecoilState(withMainData);
  const [font, setFont] = useState<FontInterface>({
    fontFamily:
      getCurrentStyle({ element, type: 'fontFamily', mainData }) || 'inherit',
    fontSize:
      getCurrentStyle({ element, type: 'fontSize', mainData }) || '16px',
    fontWeight:
      getCurrentStyle({ element, type: 'fontWeight', mainData }) || 'bold',
    fontStyle:
      getCurrentStyle({ element, type: 'fontStyle', mainData }) || 'normal',
    textAlign:
      getCurrentStyle({ element, type: 'textAlign', mainData }) || 'left',
    textTransform:
      getCurrentStyle({ element, type: 'textTransform', mainData }) || 'none',
    textDecoration:
      getCurrentStyle({ element, type: 'textDecoration', mainData }) || 'none',
  });

  const handleFont = (props: FontChangeProps) => {
    const { type, value } = props;
    if (
      (props.type === 'textTransform' || props.type === 'textDecoration') &&
      props.value === font[type]
    ) {
      setFont({ ...font, [type]: 'none' });
      styleChange({ element, type, value: 'none', setMainData });
      return;
    }
    setFont({ ...font, [type]: value });
    styleChange({ element, type, value, setMainData });
  };
  useEffect(() => {
    setFont({
      fontFamily:
        getCurrentStyle({ element, type: 'fontFamily', mainData }) || 'inherit',
      fontSize:
        getCurrentStyle({ element, type: 'fontSize', mainData }) || '16px',
      fontWeight:
        getCurrentStyle({ element, type: 'fontWeight', mainData }) || 'bold',
      fontStyle:
        getCurrentStyle({ element, type: 'fontStyle', mainData }) || 'normal',
      textAlign:
        getCurrentStyle({ element, type: 'textAlign', mainData }) || 'left',
      textTransform:
        getCurrentStyle({ element, type: 'textTransform', mainData }) || 'none',
      textDecoration:
        getCurrentStyle({ element, type: 'textDecoration', mainData }) ||
        'none',
    });
  }, [element]);

  return (
    <Styled.StyleBox>
      <Styled.InputContainer className="flex my-2">
        <Styled.Title>Font-Family</Styled.Title>
        <Select
          optionList={fontFamilyOptions}
          selected={font.fontFamily}
          onChange={(e) =>
            handleFont({ type: 'fontFamily', value: e.target.value })
          }
        />
      </Styled.InputContainer>
      <Styled.InputContainer className="flex my-2">
        <Styled.Title>Font-Style</Styled.Title>
        <Select
          optionList={fontStyleOptions}
          selected={font.fontStyle}
          onChange={(e) =>
            handleFont({ type: 'fontStyle', value: e.target.value })
          }
        />
      </Styled.InputContainer>
      <div className="flex my-2">
        <Styled.InputContainer>
          <Styled.Title>Font-Size</Styled.Title>
          <StyleInput
            placeholder={font.fontSize}
            value={font.fontSize}
            size={50}
            onChange={(e) =>
              handleFont({ type: 'fontSize', value: e.target.value })
            }
          />
        </Styled.InputContainer>
        <Styled.InputContainer>
          <Styled.Title>Font-Weight</Styled.Title>
          <StyleInput
            placeholder={font.fontWeight}
            value={font.fontWeight}
            size={50}
            onChange={(e) =>
              handleFont({ type: 'fontWeight', value: e.target.value })
            }
          />
        </Styled.InputContainer>
      </div>
      <div className="flex my-2">
        <Styled.InputContainer>
          <Styled.Title>Text-Algin</Styled.Title>
          <Styled.StyleContainer>
            {textAlignProperty.map((v) => (
              <Styled.SvgWrapper
                key={v.value}
                selected={v.value === font['textAlign']}
                onClick={() =>
                  handleFont({ type: 'textAlign', value: v.value })
                }
              >
                <SvgIcon type={`text-align-${v.value}`} />
              </Styled.SvgWrapper>
            ))}
          </Styled.StyleContainer>
        </Styled.InputContainer>
        <Styled.InputContainer>
          <Styled.Title>Text-Decoration</Styled.Title>
          <Styled.StyleContainer>
            {textTransformProperty.map((v) => (
              <Styled.SvgWrapper
                key={v.value}
                selected={v.value === font['textTransform']}
                onClick={(e) =>
                  handleFont({ e, type: 'textTransform', value: v.value })
                }
              >
                <SvgIcon type={`textTransform-${v.value}`} />
              </Styled.SvgWrapper>
            ))}
            {textDecorationProperty.map((v) => (
              <Styled.SvgWrapper
                key={v.value}
                selected={v.value === font['textDecoration']}
                onClick={(e) =>
                  handleFont({ e, type: 'textDecoration', value: v.value })
                }
              >
                <SvgIcon type={`textDecoration-${v.value}`} />
              </Styled.SvgWrapper>
            ))}
          </Styled.StyleContainer>
        </Styled.InputContainer>
      </div>
      <Styled.StyleContainer></Styled.StyleContainer>
    </Styled.StyleBox>
  );
};

export default FontMenu;
