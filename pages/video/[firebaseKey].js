import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { getSingleVideo, deleteVideo } from '../../API/videoData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewVideo() {
  const [videoDetails, setVideoDetails] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const deleteThisVideo = () => {
    if (window.confirm(`Delete ${videoDetails.video_title}?`)) {
      deleteVideo(videoDetails.firebaseKey).then(() => router.push('/'));
    }
  };

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleVideo(firebaseKey).then(setVideoDetails);
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{videoDetails.video_title}</title>
      </Head>
      <div className="video-page-container">
        <div className="video-container">
          <iframe
            width="100%"
            height="100%"
            title={videoDetails.video_title}
            className="responsive-iframe"
            src={videoDetails.video_url}
            allowfullscreen=""
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
            }}
          />
        </div>
        <div className="video-page-details">
          <h2>{videoDetails.video_title}</h2>
          <h6>Added by: {videoDetails.username} <br />
            {videoDetails.date_added}
          </h6>
          <p>{videoDetails.description}</p>
          <div className="button-container">
            {videoDetails.uid === user.uid ? (
              <Button className="video-page-buttons" href={`/video/edit/${videoDetails.firebaseKey}`}>Edit</Button>
            ) : ''}
            {videoDetails.uid === user.uid ? (
              <Button className="video-page-buttons" onClick={deleteThisVideo}>Delete</Button>
            ) : ''}
          </div>
        </div>
      </div>
    </>
  );
}
