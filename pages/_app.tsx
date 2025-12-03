import type { AppProps } from 'next/app';
import QueryProvider from '../app/providers/QueryProvider';
import '../app/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <Component {...pageProps} />
    </QueryProvider>
  );
}
