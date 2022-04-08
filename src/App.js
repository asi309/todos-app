import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
// import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import { useAuth0 } from '@auth0/auth0-react';
import Modal from 'react-modal';

import './App.css';
import useAccessToken from './hooks/useAccessToken';
import { Login, Navbar } from './components';
import { Main } from './containers';

const cache = new InMemoryCache();

// await persistCache({
//   cache,
//   storage: new LocalStorageWrapper(window.localStorage),
// });

const createApolloClient = (authToken) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.REACT_APP_HASURA_URL,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }),
    cache,
  });
};

function App() {
  Modal.setAppElement('#root');
  const idToken = useAccessToken();
  const { loading, logout } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!idToken) {
    return <Login />;
  }

  const client = createApolloClient(idToken);

  return (
    <ApolloProvider client={client}>
      <div className="app">
        <Navbar logoutHandler={logout} />
        <Main />
      </div>
    </ApolloProvider>
  );
}

export default App;
