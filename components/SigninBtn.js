import Image from 'next/image';
import React from 'react';
import { signIn } from '../utils/auth';
import userIcon from '../src/assets/images/user_icon.png';
import styles from '../styles/SigninBtn.module.css';

export default function SigninBtn() {
  return (
    <button type="button" className={styles.signinBtn} onClick={signIn}>
      <Image src={userIcon} alt="search icon" height={20} width={20} /> <p className={styles.signinP}>Sign In</p>
    </button>
  );
}
