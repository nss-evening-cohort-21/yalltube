import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getSingleVideo } from '../../API/videoData';

export default function ViewVideo() {
  const [videoDetails, setVideoDetails] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleVideo(firebaseKey).then(setVideoDetails);
  }, [firebaseKey]);

  return (
    <>
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
          <Button className="video-page-buttons">Edit</Button>
          <Button className="video-page-buttons">Delete</Button>
        </div>
      </div>
    </>
  );
}
