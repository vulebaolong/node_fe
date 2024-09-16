import { FacebookLoginClient } from '@greatsumini/react-facebook-login';
import React, { useEffect, useState } from 'react';

const appId = '1088597931155576';

export const Default = () => {
  useEffect(() => {
    FacebookLoginClient.init({ appId });
  }, []);

  return (
    <button
      onClick={() => {
        FacebookLoginClient.login(console.log, {
          scope: 'public_profile, email',
        });
      }}
    >
      login with facebook
    </button>
  );
};

export const WithMultipleApp = () => {
  const [app, setApp] = useState(0);
  const appIds = ['379865718525321', '2363450737249976'];

  const toggleApp = () => setApp((prev) => 1 - prev);

  useEffect(() => {
    loadFB();
  }, [app]);

  const loadFB = async () => {
    FacebookLoginClient.clear();
    await FacebookLoginClient.loadSdk('en_US');
    FacebookLoginClient.init({ appId: appIds[app], version: 'v9.0' });
  };

  return (
    <div>
      <button onClick={toggleApp} style={{ marginBottom: '12px' }}>
        toggle app
      </button>
      <button
        onClick={() =>
          FacebookLoginClient.login(console.log, {
            scope: 'public_profile, email',
          })
        }
      >
        Login to APP {app}
      </button>
    </div>
  );
};