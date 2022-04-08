import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const useAccessToken = () => {
  const [idToken, setIdToken] = useState(null);
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getAccessToken = async () => {
      const audience = process.env.REACT_APP_AUDIENCE;
      const scope = process.env.REACT_APP_SCOPE;

      try {
        const accessToken = await getAccessTokenSilently({
          audience,
          scope,
        });

        setIdToken(accessToken);
      } catch (error) {
        console.log(error.message);
      }
    };

    getAccessToken();
  }, [getAccessTokenSilently, user?.sub]);

  return idToken;
};

export default useAccessToken;
