export const validateUserEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return regex.test(email);
};

export const validateUserId = (id: string) => {
  const regex = /^[a-z]+[a-z0-9]{5,19}$/g; //영어 소문자+숫자 6~20자리
  return regex.test(id);
};
