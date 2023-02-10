/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { deleteMergedObj, getSingleMergedObj } from '../API/mergedData';

export default function PlaylistVideoCard({ playlistVideoObj, playlistId, onUpdate }) {
  const removeThisVideo = () => {
    if (window.confirm(`Remove ${playlistVideoObj.video_title}?`)) {
      getSingleMergedObj(playlistId, playlistVideoObj.firebaseKey).then((obj) => {
        deleteMergedObj(obj.firebaseKey).then(() => onUpdate());
      });
    }
  };
  return (
    <>
      <Card className="video-card">
        <div className="card-video-container">
          <iframe className="card-video" src={`${playlistVideoObj.video_url}?modestbranding=1&showinfo=0&mute=1`} title={playlistVideoObj.video_title}></iframe>
        </div>
        <Card.Body className="video-card-body">
          <Card.Title className="video-card-title">{playlistVideoObj.video_title}
          </Card.Title>
          <Dropdown>
            <Dropdown.Toggle className="video-card-dropdown">
              Options
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href={`/video/${playlistVideoObj.firebaseKey}`}>View</Dropdown.Item>
              <Dropdown.Item onClick={removeThisVideo}>Remove</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Body>
      </Card>
    </>
  );
}

PlaylistVideoCard.propTypes = {
  playlistVideoObj: PropTypes.shape({
    video_url: PropTypes.string,
    video_title: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  playlistId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
