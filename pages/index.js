import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { getHomeVideos, getPublicVideos } from '../API/videoData';
import VideoCard from '../components/VideoCard';
import { useAuth } from '../utils/context/authContext';

export default function Home() {
  const [homeVideos, setHomeVideos] = useState([]);
  const { user } = useAuth();
  const displayHomeVideos = () => {
    getHomeVideos(user.uid).then(setHomeVideos);
  };

  useEffect(() => {
    if (user) {
      getHomeVideos(user.uid).then(setHomeVideos);
    } else {
      getPublicVideos().then(setHomeVideos);
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="home-card-container">{homeVideos.map((video) => (
        <VideoCard key={video.firebaseKey} videoObj={video} onUpdate={displayHomeVideos} />
      ))}
      </div>
    </>
  );
}
