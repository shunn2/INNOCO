import { useRecoilState, useRecoilValue } from 'recoil';
import { withMainData } from '@recoil/editor';
import { elementInfoAtom } from '@recoil/styleSideBar/atom';
import { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import * as Styled from './styled';

const BackgroundColorMenu = () => {
  const [backgroundColor, setBackgroundColor] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);

  const element = useRecoilValue(elementInfoAtom);
  const [mainData, setMainData] = useRecoilState(withMainData);

  const handleBackgroundColorOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setBackgroundColor(
      mainData[element.sectionId].children[element.index].props.style
        .backgroundColor || 'black'
    );
  }, [element, mainData]);

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color.hex);
    setMainData((prev) => {
      const cur = JSON.parse(JSON.stringify(prev));
      cur[element.sectionId].children[
        element.index
      ].props.style.backgroundColor = color.hex;
      return cur;
    });
  };

  return (
    <div>
      <Styled.BackgroundColorContainer
        className="flex"
        onClick={handleBackgroundColorOpen}
      >
        <Styled.BackgroundColorSquare backgroundColor={backgroundColor} />
        {backgroundColor}
        {isOpen && (
          <div style={{ position: 'absolute', marginLeft: '-228px' }}>
            <ChromePicker
              color={backgroundColor}
              onChange={(color) => handleBackgroundColorChange(color)}
            />
          </div>
        )}
      </Styled.BackgroundColorContainer>
    </div>
  );
};

export default BackgroundColorMenu;
