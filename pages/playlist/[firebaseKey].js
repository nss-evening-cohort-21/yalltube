import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSinglePlaylist } from '../../API/playlistData';

export default function ViewPlaylistPage() {
  const [playlist, setPlaylist] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getPlaylist = () => {
    getSinglePlaylist(firebaseKey).then(setPlaylist);
  };
  useEffect(() => {
    getPlaylist();
  });
  return (
    <>
      <Head>
        <title>{playlist.playlist_name} Playlist</title>
      </Head>
      <h1>{playlist.playlist_name} Playlist</h1>
    </>
  );
}
