import React, { useState, useEffect } from 'react';
import Login from './Login';
import MailLauncher from './MailLauncher';

function App() {
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <MailLauncher token={token} />
          <button onClick={handleLogout} style={{ marginTop: '20px' }}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default App;
