import { useRecoilState, useRecoilValue } from 'recoil';
import { withMainData } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/selectedElement/atom';
import { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import * as Styled from '../styled';
import styleChange from '@utils/style/styleChange';
import getCurrentStyle from '@utils/style/getCurrentStyle';

const BackgroundColorMenu = () => {
  const element = useRecoilValue(elementInfoAtom);
  const [mainData, setMainData] = useRecoilState(withMainData);

  const [backgroundColor, setBackgroundColor] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  const handleBackgroundColorOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color.hex);
    styleChange({
      element,
      type: 'backgroundColor',
      value: color.hex,
      setMainData,
    });
  };

  useEffect(() => {
    setBackgroundColor(
      getCurrentStyle({ element, type: 'backgroundColor', mainData }) || 'white'
    );
  }, [element]);

  return (
    <Styled.StyleBox>
      <Styled.StyleContainer
        className="flex"
        onClick={handleBackgroundColorOpen}
      >
        <Styled.ColorSquare color={backgroundColor} />
        {backgroundColor}
      </Styled.StyleContainer>
      {isOpen && (
        <Styled.AbsoluteColorPicker>
          <ChromePicker
            color={backgroundColor}
            onChange={(color) => handleBackgroundColorChange(color)}
          />
        </Styled.AbsoluteColorPicker>
      )}
    </Styled.StyleBox>
  );
};

export default BackgroundColorMenu;
