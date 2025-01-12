import GlobalLayout from '@/\bcomponents/global-layout';
import TodoBar from '@/\bcomponents/todo-bar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  );
}
