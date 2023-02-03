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
      <div className="embed-responsive embed-responsive-16by9">
        <iframe title={videoDetails.video_title} className="embed-responsive-item" src={videoDetails.video_url} width="100%" height="100%" allowfullscreen />
      </div>
      <div className="text-white ms-5 details">
        <h4>
          {videoDetails.title} Video added by <br />
          {videoDetails.username}
        </h4>
        <p>{videoDetails.description}</p>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>

    </>
  );
}
