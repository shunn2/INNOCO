import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Hydrate, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from '@react-query/queryClient';
import { ThemeProvider } from 'styled-components';
import { SessionProvider } from 'next-auth/react';
import theme from '@styles/theme';
import GlobalStyle from '@styles/global-style';
import { SvgSprite } from '@components/Common';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SessionProvider>
            <GlobalStyle />
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
            <SvgSprite />
          </SessionProvider>
        </ThemeProvider>
        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
