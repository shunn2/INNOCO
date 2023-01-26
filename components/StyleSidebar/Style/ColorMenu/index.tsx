import { useRecoilState, useRecoilValue } from 'recoil';
import { withMainData } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/styleSideBar/atom';
import { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import * as Styled from '../styled';
import getCurrentStyle from '@utils/style/getCurrentStyle';
import styleChange from '@utils/style/styleChange';

const ColorMenu = () => {
  const [color, setColor] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  const element = useRecoilValue(elementInfoAtom);
  const [mainData, setMainData] = useRecoilState(withMainData);

  const handleColorOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setColor(getCurrentStyle({ element, type: 'color', mainData }) || 'black');
  }, [element, mainData]);

  const handleColorChange = (color) => {
    setColor(color.hex);
    styleChange({ element, type: 'color', value: color.hex, setMainData });
  };

  return (
    <Styled.StyleBox>
      <Styled.StyleContainer className="flex" onClick={handleColorOpen}>
        <Styled.ColorSquare color={color} />
        {color}
      </Styled.StyleContainer>
      {isOpen && (
        <Styled.AbsoluteColorPicker>
          <ChromePicker
            color={color}
            onChange={(color) => handleColorChange(color)}
          />
        </Styled.AbsoluteColorPicker>
      )}
    </Styled.StyleBox>
  );
};

export default ColorMenu;
