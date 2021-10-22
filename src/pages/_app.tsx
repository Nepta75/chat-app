import { useEffect } from 'react';
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from '../components/NavBar';
import {
  ApolloClient, ApolloProvider,
} from '@apollo/client';
import { cache } from '../apollo/cache';
import { userQuery } from '../apollo/user/query';
import router, { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const rooter = useRouter();

  const client = new ApolloClient({
    cache,
  });
  
  useEffect(() => {
    (async function getUser() {
      const { data: { user }} = await client.query({ query: userQuery });
      const isPublicRoute = !['/', '/connexion', '/inscription'].includes(rooter.pathname)
      const isLogged = Object.keys(user).length > 0;
      if (!isLogged && isPublicRoute) {
        router.push('/connexion');
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooter]);


  return (
    <ApolloProvider client={client} >
      <Navbar />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}


export default MyApp
