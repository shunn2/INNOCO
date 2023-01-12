import editorAtom from '@recoil/editor/atom';
import { elementInfoAtom } from '@recoil/styleSideBar/atom';
import { useState } from 'react';
import { ChromePicker } from 'react-color';
import { useRecoilState, useRecoilValue } from 'recoil';

const ColorMenu = () => {
  const [color, setColor] = useState({});

  const element = useRecoilValue(elementInfoAtom);
  const [mainData, setMainData] = useRecoilState(editorAtom);

  const handleColorChange = (color) => {
    setColor(color.hex);
    setMainData((prev) => {
      const cur = JSON.parse(JSON.stringify(prev));
      cur.main[element.sectionId].children[3].props.style.backgroundColor =
        color.hex;
      return cur;
    });
  };

  return (
    <div>
      <ChromePicker
        color={color}
        onChange={(color) => handleColorChange(color)}
      />
    </div>
  );
};

export default ColorMenu;
