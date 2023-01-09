export const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return regex.test(email);
};

export const validateId = (id: string) => {
  const regex = /^[a-z]+[a-z0-9]{5,19}$/g; //영어 소문자+숫자 6~20자리
  return regex.test(id);
};

export const validatePassword = (password: string) => {
  const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  return regex.test(password);
};
