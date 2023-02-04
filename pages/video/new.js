import Head from 'next/head';
import React from 'react';
import VideoForm from '../../components/forms/VideoForm';

export default function AddVideoPage() {
  return (
    <>
      <Head>
        <title>Add Video</title>
      </Head>
      <VideoForm />
    </>
  );
}
