/* eslint-disable react/no-unknown-property */
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

function PlaylistCard({ playlistObj, onUpdate }) {
  const deleteThisPlaylist = () => {
    if (window.confirm(`Delete ${playlistObj.playlist_title}?`)) {
      deleteVideo(playlistObj.firebaseKey).then(() => onUpdate());
    }
  };
  const { user } = useAuth();
  return (
    <>
      <Card className="video-card">
        <div className="card-video-container">
          <img className="card-video" src={playlistObj.image} alt={playlistObj.playlist_title}></img>
        </div>
        <Card.Body className="video-card-body">
          <Card.Title className="video-card-title">{playlistObj.playlist_title}
          </Card.Title>
          <div>{user.displayName}</div>
          <div>{playlistObj.playlist_title}</div>
          <Dropdown>
            <Dropdown.Toggle className="video-card-dropdown">
              Options
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href={`/playlist/${playlistObj.firebaseKey}`}>View</Dropdown.Item>
              <Dropdown.Item href={`/playlist/edit/${playlistObj.firebaseKey}`}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={deleteThisPlaylist}>Delete</Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
        </Card.Body>
      </Card>
    </>
  );
}

PlaylistCard.propTypes = {
  playlistObj: PropTypes.shape({
    playlist_title: PropTypes.string,
    image: PropTypes.string,
    date_added: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlaylistCard;
