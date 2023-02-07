import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSinglePlaylist } from '../../API/playlistData';
import PlaylistVideoCard from '../../components/PlaylistVideoCard';

export default function ViewPlaylistPage() {
  const [playlist, setPlaylist] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getPlaylist = () => {
    getSinglePlaylist(firebaseKey).then(setPlaylist);
  };
  useEffect(() => {
    getPlaylist();
  }, []);
  return (
    <>
      <Head>
        <title>PlaYlist</title>
      </Head>
      {/* <h1>Playlist: {playlist.playlist_name}</h1> */}
      <PlaylistVideoCard playlistVideoObj={playlist} onUpdate={getPlaylist} />
    </>
  );
}
