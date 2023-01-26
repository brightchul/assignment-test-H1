import '@/styles/globals.css';

import { RecoilRoot } from 'recoil';
import type { AppProps } from 'next/app';

import SyncLocalStorage from '@/components/SyncLocalStorage';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SyncLocalStorage>
        <Component {...pageProps} />
      </SyncLocalStorage>
    </RecoilRoot>
  );
}
