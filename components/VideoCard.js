/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
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
          <Card.Title className="video-card-title">{videoObj.video_title}</Card.Title>
          <div>{videoObj.description}</div>
          <div className="card-public">{videoObj.public === true ? 'Public' : 'Private' }</div>
          <div>Created by: {videoObj.username}</div>
          <div>{videoObj.date_added}</div>
          <hr />
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Options
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href={`/video/${videoObj.firebaseKey}`}>View</Dropdown.Item>
              {videoObj.uid === user.uid
                ? (
                  <Dropdown.Item href={`/video/edit/${videoObj.firebaseKey}`}>Edit</Dropdown.Item>
                ) : ''}
              {videoObj.uid === user.uid
                ? (<Dropdown.Item onClick={deleteThisVideo}>Delete</Dropdown.Item>
                ) : ''}
            </Dropdown.Menu>
          </Dropdown>
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
