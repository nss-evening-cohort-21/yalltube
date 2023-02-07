import React from 'react';
import SigninBtn from './SigninBtn';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <p>Please sign in to access this feature</p>
      <SigninBtn />
    </div>
  );
}

export default Signin;
