/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getMergedObjectsByPlaylistId } from '../../API/mergedData';
import { getSinglePlaylist } from '../../API/playlistData';
import { getAllVideos } from '../../API/videoData';
import PlaylistVideoCard from '../../components/PlaylistVideoCard';

export default function ViewPlaylistPage() {
  const [playlist, setPlaylist] = useState({});
  const [videos, setVideos] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getPlaylistDetails = () => {
    getSinglePlaylist(firebaseKey).then(setPlaylist);
    getMergedObjectsByPlaylistId(firebaseKey).then((arr) => {
      const videoKeys = arr.map((item) => item.video_id);
      getAllVideos().then((videosArr) => {
        const videosArray = videosArr.filter((video) => videoKeys.includes(video.firebaseKey));
        setVideos(videosArray);
      });
    });
  };

  useEffect(() => {
    getPlaylistDetails();
  }, [firebaseKey]);
  return (
    <>
      <Head>
        <title>{playlist.playlist_name} Playlist</title>
      </Head>
      <h1>{playlist.playlist_name} Playlist</h1>
      <div className=" d-flex flex-wrap justify-content-center">
        {videos.map((item) => <PlaylistVideoCard key={item.firebaseKey} playlistVideoObj={item} playlistId={firebaseKey} onUpdate={getPlaylistDetails} />)}
      </div>
    </>
  );
}
