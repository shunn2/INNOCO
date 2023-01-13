import styled from 'styled-components';

export const IframStyle = {
  IframeBox: styled.div`
    position: relative;
    width: calc(100% - 466px);
  `,
  Iframe: styled.iframe`
    position: absolute;
    width: 100%;
    height: 100%;
  `,
};
