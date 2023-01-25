import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      blue: {
        light: string;
        middle: string;
        dark: string;
      };
      gray: {
        light: string;
        middle: string;
        dark: string;
      };
      white: {
        light: string;
        middle: string;
        dark: string;
      };
    };
  }
}
