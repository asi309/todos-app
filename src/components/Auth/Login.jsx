import { useAuth0 } from '@auth0/auth0-react';

import cover from '../../assets/cover.mp4';
import './Login.scss';

const Login = () => {
  const { loading, loginWithRedirect } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="login-screen">
      <div className="login-screen__bg">
        <video
          src={cover}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
        />
      </div>
      <div className="login__overlay">
        <div className="login-screen__fg">
          <h1 className="login__welcome-title">Welcome to Todos App</h1>
          <h2 className="login__welcome-subtitle">Login to continue</h2>
          <button className="login__welcome-cta" onClick={loginWithRedirect}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
