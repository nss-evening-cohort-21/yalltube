import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSinglePlaylist, getPlaylistVideos } from '../../API/playlistData';

export default function ViewPlaylistPage() {
  const [playlist, setPlaylist] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getPlaylist = () => {
    getSinglePlaylist(firebaseKey).then(setPlaylist);
    getPlaylistVideos(firebaseKey).then(setPlaylistVideos);
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
