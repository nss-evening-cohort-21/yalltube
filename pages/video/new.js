import Head from 'next/head';
import React from 'react';
import VideoForm from '../../components/forms/VideoForm';
import Signin from '../../components/Signin';
import { useAuth } from '../../utils/context/authContext';

export default function AddVideoPage() {
  const { user } = useAuth();
  return (
    <>
      <Head>
        <title>Add Video</title>
      </Head>
      {user ? <VideoForm /> : <Signin />}

    </>
  );
}
