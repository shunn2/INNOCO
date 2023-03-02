import { IframeEditorReturn } from '@utils/iframe/iframeEditorReturn';
import { useState } from 'react';

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:plain/text;charset=utf-8,' + encodeURIComponent(text)
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

const FileDownload = () => {
  const [editorString, setEditorString] = useState<string>();

  const [component, setComponent] = useState([
    'const Index = () =>{return (',
    ');};',
  ]);

  const handleParsing = (type) => {
    const editor =
      IframeEditorReturn().contentWindow.document.getElementById('editor');
    if (editor !== null) {
      setEditorString(new XMLSerializer().serializeToString(editor!));
    }
    if (type === 'react')
      setComponent((prev) => {
        let cur = [...prev];
        cur.splice(1, 0, editorString);
        return cur;
      });
    if (type === 'react') download('index.jsx', component.join(''));
    else download('index.html', editorString);
  };

  return (
    <div className="absolute mt-8 bg-[#33ADFF] py-1	px-3 rounded-md text-white text-xs hover:bg-[#238DE0]">
      <div
        className="py-1 px-3 cursor-pointer hover:text-stone-400"
        onClick={() => handleParsing('react')}
      >
        React
      </div>
      <div
        className="py-1 px-3 cursor-pointer hover:text-stone-400"
        onClick={() => handleParsing('html')}
      >
        HTML
      </div>
    </div>
  );
};

export default FileDownload;

//https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
