import React, { useState } from 'react';
import { Input } from '@components/Common';

const SignIn = () => {
  const [input, setInput] = useState('');
  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      <Input placeholder={'아이디를 입력하세요.'} onChange={_onChange} />
    </>
  );
};

export default SignIn;
