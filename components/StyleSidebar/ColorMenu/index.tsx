import { useRecoilState, useRecoilValue } from 'recoil';
import { withMainData } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/styleSideBar/atom';
import { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import * as Styled from './styled';

const ColorMenu = () => {
  const [color, setColor] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  const element = useRecoilValue(elementInfoAtom);
  const [mainData, setMainData] = useRecoilState(withMainData);

  const handleColorOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setColor(
      mainData[element.sectionId].children[element.index].props.style.color ||
        'black'
    );
  }, [element, mainData]);

  const handleColorChange = (color) => {
    setColor(color.hex);
    setMainData((prev) => {
      const cur = JSON.parse(JSON.stringify(prev));
      cur[element.sectionId].children[element.index].props.style.color =
        color.hex;
      return cur;
    });
  };

  return (
    <div>
      <Styled.ColorContainer className="flex" onClick={handleColorOpen}>
        <Styled.ColorSquare color={color} />
        {color}
        {isOpen && (
          <div style={{ position: 'absolute', marginLeft: '-228px' }}>
            <ChromePicker
              color={color}
              onChange={(color) => handleColorChange(color)}
            />
          </div>
        )}
      </Styled.ColorContainer>
    </div>
  );
};

export default ColorMenu;
