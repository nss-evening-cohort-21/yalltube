import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPlaylist, updatePlaylist } from '../../API/playlistData';

const initialState = {
  firebaseKey: '',
  playlist_name: '',
  uid: '',
  image: '',
};

export default function PlaylistForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
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
    if (obj.firebaseKey) {
      updatePlaylist(formInput)
        .then(() => router.back());
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlaylist(payload)
        .then(({ name }) => {
          const patchPayload = { firebaseKey: name };
          updatePlaylist(patchPayload)
            .then(() => router.back());
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="mt-5 mb-3">{obj.firebaseKey ? 'Update' : 'Add'} Playlist</h1>

      {/* PLAYLIST TITLE */}
      <FloatingLabel controlId="floatingInput1" label="Playlist Name" className="mb-3 text-black">
        <Form.Control
          type="text"
          name="playlist_name"
          value={formInput.playlist_name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PLAYLIST IMAGE URL */}
      <FloatingLabel controlId="floatingInput2" label="Playlist Image URL" className="mb-3 text-black">
        <Form.Control
          type="url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit" className="blue-btn">{obj.firebaseKey ? 'Update' : 'Add'} Playlist</Button>
      <Button type="btn" className="mx-2 red-btn" onClick={() => router.back()}>Cancel</Button>

    </Form>
  );
}

PlaylistForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    playlist_name: PropTypes.string,
    uid: PropTypes.string,
    image: PropTypes.string,
  }),
};

PlaylistForm.defaultProps = {
  obj: initialState,
};
