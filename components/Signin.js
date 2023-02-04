/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { getPublicVideos } from '../API/videoData';
// import { signIn } from '../utils/auth';
import NavBar from './NavBar';
import VideoCard from './VideoCard';

function Signin() {
  const [videos, setVideos] = useState([]);
  const displayVideos = () => {
    getPublicVideos().then(setVideos);
  };
  useEffect(() => {
    displayVideos();
  }, []);
  return (
    <>
      <Head>
        <title>Y'allTube</title>
      </Head>
      <NavBar />
      <div className="home-card-container">{videos.map((video) => (
        <VideoCard key={video.firebaseKey} videoObj={video} onUpdate={displayVideos} />
      ))}
      </div>
    </>
  );
}

export default Signin;
