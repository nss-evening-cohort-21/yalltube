/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import deleteVideo from '../API/videoData';

function VideoCard({ videoObj, onUpdate }) {
  const deleteThisVideo = () => {
    if (window.confirm(`Delete ${videoObj.video_title}?`)) {
      deleteVideo(videoObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card
        className="team-card"
        style={{
          width: '35%', margin: '10px', color: 'white', background: 'black',
        }}
      >
        <iframe src={`${videoObj.video_url}?modestbranding=1&showinfo=0&mute=1`} title={videoObj.video_title} style={{ height: '150%' }}></iframe>
        <Card.Body>
          <Card.Title className="team-card-title">{videoObj.video_title}</Card.Title>
          <p>{videoObj.description}</p>
          <p>Created by:{videoObj.username}</p>
          <hr />

          <Link href={`/video/${videoObj.firebaseKey}`} passHref>
            <Button className="team-view-button">VIEW</Button>
          </Link>

          <Link href={`/video/edit/${videoObj.firebaseKey}`} passHref>
            <Button className="team-edit-button">EDIT</Button>
          </Link>
          <Button className="team-delete-button" onClick={deleteThisVideo}>
            DELETE
          </Button>
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default VideoCard;
