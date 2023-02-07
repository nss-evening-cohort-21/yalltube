import Head from 'next/head';
import React from 'react';
import PlaylistForm from '../../components/forms/PlaylistForm';
import Signin from '../../components/Signin';
import { useAuth } from '../../utils/context/authContext';

export default function AddPlaylistPage() {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Add Playlist</title>
      </Head>
      {user ? <PlaylistForm /> : <Signin />}
    </>
  );
}
