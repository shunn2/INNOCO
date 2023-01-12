import { useState } from 'react';

const DevTest = () => {
  const [text, setText] = useState('');
  const handleChangeText = (e): void => {
    const target = e.target as HTMLElement;
    setText(target.innerText);
  };
  return (
    <div className="no-zoom" style={{ width: '2000px', height: '2000px' }}>
      <div
        contentEditable
        onInput={(e) => handleChangeText(e)}
        suppressContentEditableWarning={true}
      >
        hi
      </div>
      <div>{text}</div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1>Hello world!</h1>
    </div>
  );
};

export default DevTest;
