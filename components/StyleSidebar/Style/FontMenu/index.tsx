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
}

interface FontChangeProps {
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
  });

  const handleFont = ({ type, value }: FontChangeProps) => {
    styleChange({ element, type, value, setMainData });
  };

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
          <StyleInput placeholder={font.fontSize} size={50} />
        </Styled.InputContainer>
        <Styled.InputContainer>
          <Styled.Title>Font-Weight</Styled.Title>
          <StyleInput placeholder={font.fontWeight} size={50} />
        </Styled.InputContainer>
      </div>
      <Styled.StyleContainer>
        {textAlignProperty.map((v) => (
          <Styled.SvgWrapper
            key={v.value}
            selected={v.value === font['textAlign']}
          >
            <SvgIcon type={`text-align-${v.value}`} />
          </Styled.SvgWrapper>
        ))}
      </Styled.StyleContainer>
      <div>
        <SvgIcon type="text-transform-uppercase" />
      </div>
    </Styled.StyleBox>
  );
};

export default FontMenu;
