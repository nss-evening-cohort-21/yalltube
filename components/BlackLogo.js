import React from 'react';
import Image from 'next/image';
import logo from '../src/assets/images/logo_black.png';

export default function BlackLogo() {
  return (
    <>
      <Image src={logo} alt="Logo" width="600px" height="600px" />
    </>
  );
}
