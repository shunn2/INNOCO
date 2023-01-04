import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      blue: string;
      gray: {
        light: string;
        middle: string;
        dark: string;
      };
    };
  }
}
