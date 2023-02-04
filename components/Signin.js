import React from 'react';
import Image from 'next/image';
import { signIn } from '../utils/auth';
import userIcon from '../src/assets/images/user_icon.png';

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
      <button type="button" className="signin-btn" onClick={signIn}>
        <Image src={userIcon} alt="search icon" height={20} width={20} /> <p className="signin-p">Sign In</p>
      </button>
    </div>
  );
}

export default Signin;
