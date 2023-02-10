import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getPlaylists } from '../API/playlistData';
import { createMergedObj, updateMergedObj } from '../API/mergedData';

const initialState = {
  playlist_id: '',
};

export default function PlaylistSelectModal({ obj }) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(initialState);
  const [playlists, setPlaylists] = useState([]);

  const router = useRouter();
  const { user } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getPlaylists(user.uid).then(setPlaylists);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formInput.playlist_id) {
      const payload = { ...formInput, video_id: obj.firebaseKey };
      createMergedObj(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMergedObj(patchPayload).then(router.push(`/playlist/${formInput.playlist_id}`));
      });
    } else {
      window.alert('You must select a valid playlist');
    }
  };

  return (
    <>
      <button className="addBtn" onClick={handleShow} type="button">
        Add to Playlist?
      </button>

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
          <Button variant="light" onClick={handleSubmit}>
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
