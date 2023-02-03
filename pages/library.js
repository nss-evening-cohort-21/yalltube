import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { getUserVideos } from '../API/videoData';
import VideoCard from '../components/VideoCard';
import { useAuth } from '../utils/context/authContext';

export default function Home() {
  const [libraryVideos, setLibraryVideos] = useState([]);
  const { user } = useAuth();
  const displayUserVideos = () => {
    getUserVideos(user.uid).then(setLibraryVideos);
  };

  useEffect(() => {
    getUserVideos(user.uid).then(setLibraryVideos);
  }, [user]);

  return (
    <>
      <Head>
        <title>Home Videos</title>
      </Head>
      <div className="center-home-content">
        <div className="home-content-container">
          <div className="home-card-container">{libraryVideos.map((video) => (
            <VideoCard key={video.firebaseKey} videoObj={video} onUpdate={displayUserVideos} />
          ))}
          </div>
        </div>
      </div>
    </>
  );
}
