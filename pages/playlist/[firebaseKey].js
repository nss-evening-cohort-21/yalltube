import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewPlaylistDetails } from '../../API/mergedData';
// import PlaylistVideoCard from '../../components/PlaylistVideoCard';

export default function ViewPlaylistPage() {
  const [playlist, setPlaylist] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  // const getPlaylistDetails = () => {
  //   viewPlaylistDetails(firebaseKey).then(setPlaylist);
  //   // console.warn(playlist.videos.map((item) => item.video_title));
  // };
  useEffect(() => {
    // getPlaylistDetails();
    viewPlaylistDetails(firebaseKey).then(setPlaylist);
  }, [firebaseKey]);
  return (
    <>
      <Head>
        <title>{playlist.playlist_name} Playlist</title>
      </Head>
      <h1>{playlist.playlist_name} Playlist</h1>
      {/* {playlist.videos?.map((item) => <PlaylistVideoCard key={item.firebaseKey} playlistVideoObj={item} onUpdate={getPlaylistDetails} />)} */}
      <div>
        {playlist.videos?.map((item) => <h1 key={item.firebaseKey}>{item.video_title}</h1>)}
      </div>
    </>
  );
}
