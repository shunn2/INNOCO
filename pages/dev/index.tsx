import axios from 'axios';
import React, { useState } from 'react';

const URL = 'http://10.5.26.54:8080';

const dataComponent = {
  dataComponent: [
    {
      id: 'dataComponent_1',
      section_id: 1,
      type: 'dataComponent',
      contents: {
        type: 'Contents',
        tag: 'div',
        props: {
          style: {
            width: '500px',
            height: '800px',
            border: '1px solid white',
          },
        },
        children: [
          {
            id: 'content',
            type: 'content',
            tag: 'div',
            props: {
              style: {
                width: '500px',
                height: '300px',
                border: '1px solid red',
              },
            },
            children: [
              {
                id: 'comment_1',
                tag: 'div',
                content: '안녕하세요',
              },
            ],
          },
          {
            id: 'input',
            type: 'input',
            tag: 'input',
            props: {
              style: {
                width: '400px',
                height: '50px',
                border: '1px solid blue',
              },
              onChange: (e) => console.log(e.target.value),
            },
            children: [],
          },
          {
            id: 'button',
            type: 'button',
            tag: 'button',
            props: {
              style: {
                width: '50px',
                height: '20px',
                border: '1px solid yellow',
              },
              onClick: (id) => {
                console.log(
                  (document.getElementById('input') as HTMLInputElement).value
                );
              },
            },
            children: [],
          },
        ],
      },
    },
  ],
};
const DevTest = () => {
  const [data, setData] = useState(dataComponent);

  const handleClick = (id) => {
    const input = document.getElementById(id) as HTMLInputElement;
    const postData = {
      name: '성훈',
      contents: input.value,
      date: Date.now(),
    };
    axios
      .post(`${URL}/data`, {
        ownerLoginId: 'sdfsdf',
        projectName: '63eb5950cca8e7079204f685',
        pageName: 'q',
        type: 'data',
        data: postData,
      })
      .then((res) => console.log(res));
    setData((prev) => {
      const cur = JSON.parse(JSON.stringify(prev));
      console.log(cur.dataComponent[0]);
      cur.dataComponent[0].contents.children[0].children.push({
        id: input.value,
        tag: 'div',
        content: input.value,
      });

      return cur;
    });
    input.value;
  };

  return (
    <div>
      <textarea onChange={(e) => console.log(e)}></textarea>
    </div>
  );
};

export default DevTest;
