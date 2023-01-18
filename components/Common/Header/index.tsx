import * as Styled from './styled';

const Header = () => {
  return (
    <Styled.HeaderContainer>
      <Styled.LogoImage
        src={'/logo.png'}
        alt="INNOCO 로고이미지"
        width="0"
        height="0"
        sizes="100vw"
      />
      {/* <div>유저정보</div> */}
    </Styled.HeaderContainer>
  );
};

export default Header;
