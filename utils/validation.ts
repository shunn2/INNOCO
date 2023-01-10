export const validateInput = (type: string, input: string) => {
  const validateEmail = () => {
    const regex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/; //아이디@도메인
    return regex.test(input);
  };

  const validateId = () => {
    const regex = /^[a-z]+[a-z0-9]{5,19}$/g; //영어 소문자+숫자 6~20자리
    return regex.test(input);
  };

  const validatePassword = () => {
    const regex = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; //8자 이상, 특수문자 필수
    return regex.test(input);
  };

  if (type === 'email') return validateEmail();
  if (type === 'id') return validateId();
  if (type === 'password') return validatePassword();
};
