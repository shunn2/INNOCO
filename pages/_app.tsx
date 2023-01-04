import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Hydrate, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { queryClient } from '@react-query/queryClient';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
