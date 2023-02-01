/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteVideo } from '../API/videoData';

function VideoCard({ videoObj, onUpdate }) {
  const deleteThisVideo = () => {
    if (window.confirm(`Delete ${videoObj.video_title}?`)) {
      deleteVideo(videoObj.firebaseKey).then(() => onUpdate());
    }
  };
  const { user } = useAuth();
  return (
    <>
      <Card className="video-card">
        <iframe className="card-video" src={`${videoObj.video_url}?modestbranding=1&showinfo=0&mute=1`} title={videoObj.video_title}></iframe>
        <Card.Body className="video-card-body">
          <Card.Title className="team-card-title">{videoObj.video_title}</Card.Title>
          <p>{videoObj.description}</p>
          <p>Created by:{videoObj.username}</p>
          <p className="card-public">{videoObj.public === true ? 'Public' : 'Private' }</p>
          <p>{videoObj.date_added}</p>
          <hr />
          <Link href={`/video/${videoObj.firebaseKey}`} passHref>
            <Button className="video-card-button">VIEW</Button>
          </Link>
          {videoObj.uid === user.uid
            ? (
              <Link href={`/video/edit/${videoObj.firebaseKey}`} passHref>
                <Button className="video-card-button">EDIT</Button>
              </Link>
            ) : ''}
          {videoObj.uid === user.uid
            ? (<Button className="video-card-button" onClick={deleteThisVideo}>DELETE</Button>
            ) : ''}
        </Card.Body>
      </Card>
    </>
  );
}

VideoCard.propTypes = {
  videoObj: PropTypes.shape({
    video_url: PropTypes.string,
    video_title: PropTypes.string,
    description: PropTypes.string,
    public: PropTypes.bool,
    image: PropTypes.string,
    date_added: PropTypes.string,
    username: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default VideoCard;
