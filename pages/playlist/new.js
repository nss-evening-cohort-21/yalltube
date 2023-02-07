import Head from 'next/head';
import React from 'react';
import PlaylistForm from '../../components/forms/PlaylistForm';

export default function AddPlaylistPage() {
  return (
    <>
      <Head>
        <title>Add Playlist</title>
      </Head>
      <PlaylistForm />
    </>
  );
}
