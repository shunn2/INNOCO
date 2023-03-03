import { IframeEditorReturn } from '@utils/iframe/iframeEditorReturn';
import { useState } from 'react';

function download(filename, text) {
  console.log('text', text);

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
  const handleParsing = (type) => {
    const editor = IframeEditorReturn().contentWindow;

    const HtmlString = editor.document.getElementById('editor').outerHTML;

    if (type === 'react') {
      download(
        'index.jsx',
        ['const Index = () =>{return (', HtmlString, ');};'].join('')
      );
    } else {
      download('index.html', HtmlString);
    }
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
