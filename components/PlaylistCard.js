/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Link from 'next/link';
import { deletePlaylistData } from '../API/mergedData';

function PlaylistCard({ playlistObj, onUpdate }) {
  const deleteThisPlaylist = () => {
    if (window.confirm(`Delete ${playlistObj.playlist_name}?`)) {
      deletePlaylistData(playlistObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <>
      <Card className="video-card">
        <Link passHref href={`/playlist/${playlistObj.firebaseKey}`}>
          <div className="card-video-container">
            <img className="card-video" src={playlistObj.image} alt={playlistObj.playlist_name}></img>
          </div>
        </Link>
        <Card.Body className="video-card-body">
          <Card.Title className="video-card-title">{playlistObj.playlist_name}
          </Card.Title>

          <Dropdown>
            <Dropdown.Toggle className="video-card-dropdown">
              Options
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="dropdown-item" href={`/playlist/${playlistObj.firebaseKey}`}>View</Dropdown.Item>
              <Dropdown.Item className="dropdown-item" href={`/playlist/edit/${playlistObj.firebaseKey}`}>Edit</Dropdown.Item>
              <Dropdown.Item className="dropdown-item" onClick={deleteThisPlaylist}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Body>
      </Card>
    </>
  );
}

PlaylistCard.propTypes = {
  playlistObj: PropTypes.shape({
    playlist_name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlaylistCard;
