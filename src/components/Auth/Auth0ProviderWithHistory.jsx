import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const navigate = useNavigate();

  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const audience = process.env.REACT_APP_AUDIENCE;
  const scope = process.env.REACT_APP_SCOPE;

  const redirectHandler = (state) => {
    navigate(state?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={redirectHandler}
      audience={audience}
      scope={scope}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
