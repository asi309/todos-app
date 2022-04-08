import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { usersQuery } from '../../constants';
import './Navbar.scss';

const Navbar = ({ logoutHandler }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const { loading, error, data } = useQuery(usersQuery.getUserDetails, {
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-only',
  });

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <h1>Todos App</h1>
      </div>
      <div
        className="app__navbar-user_details"
        onClick={() =>
          setProfileMenuOpen((profileMenuOpen) => !profileMenuOpen)
        }
      >
        {loading && <div className="app__navbar-user-loading">loading...</div>}
        {error && console.log(error)}
        {!loading && !error && (
          <>
            <div className="app__navbar-user-picture">
              <img src={data?.users[0]?.picture} alt="user-profile" />
            </div>
            <div className="app__navbar-user-name">{data?.users[0]?.name}</div>
          </>
        )}
      </div>
      {profileMenuOpen && (
        <div className="app__navbar-options">
          <button onClick={logoutHandler}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
