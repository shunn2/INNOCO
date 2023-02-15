import axios from 'axios';
import React, { useState } from 'react';

const URL = 'http://10.5.26.54:8080';

const CreateGuestBook = ({ data }) => {
  return (
    <div {...data.sectionProps}>
      <h4 className="my-3">0개의 방명록</h4>
      <div {...data.children[1].parentProps}>
        <textarea id="input" {...data.children[1].props} />
        <div {...data.children[2].parentProps}>
          <button {...data.children[2].props}>작성</button>
        </div>
      </div>
    </div>
  );
};

export default CreateGuestBook;
