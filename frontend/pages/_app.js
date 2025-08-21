import Head from 'next/head';
// ...
<Head>
  <link rel="icon" href="/favicon.png" />
</Head>
  
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
