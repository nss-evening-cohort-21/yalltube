import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

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
      {/* <h1>Hi there!</h1> */}
      <p>Please sign in to access this feature</p>
      <Button type="button" variant="dark" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
