import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useAuth } from '../utils/context/authContext';
import { getPlaylists, addToPlaylist } from '../API/playlistData';

const initialState = {
  playlist_id: '',
};

export default function PlaylistSelectModal({ obj }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formInput, setFormInput] = useState(initialState);
  const [playlists, setPlaylists] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getPlaylists(user.uid).then(setPlaylists);
    console.warn(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    console.warn(formInput);
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      addToPlaylist(obj, formInput.playlist_id)
        .then(() => router.back());
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add to Playlist?
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="playlistModal" closeButton>
          <Modal.Title>Add to Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body className="playlistModal">
          <Form>
            <FloatingLabel controlId="floatingSelect">
              <Form.Select
                aria-label="Playlist"
                name="playlist_id"
                onChange={handleChange}
                className="mb-3"
                required
              >
                <option value="">Select a Playlist</option>
                {
            playlists.map((playlist) => (
              <option
                key={playlist.firebaseKey}
                value={playlist.firebaseKey}
              >
                {playlist.playlist_name}
              </option>
            ))
          }
              </Form.Select>
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer className="playlistModal">
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

PlaylistSelectModal.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    video_title: PropTypes.string,
    video_url: PropTypes.string,
    date_added: PropTypes.string,
    description: PropTypes.string,
    uid: PropTypes.string,
    public: PropTypes.bool,
    username: PropTypes.string,
  }).isRequired,
};
