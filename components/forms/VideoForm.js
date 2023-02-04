import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createVideo, updateVideo } from '../../API/videoData';

const initialState = {
  firebaseKey: '',
  video_title: '',
  video_url: '',
  date_added: '',
  description: '',
  uid: '',
  public: false,
  username: '',
};

export default function VideoForm({ obj }) {
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
      updateVideo(formInput)
        .then(() => router.push(`/video/${obj.firebaseKey}`));
    } else {
      const payload = {
        ...formInput, uid: user.uid, date_added: new Date().toLocaleString(), username: user.displayName,
      };
      createVideo(payload)
        .then(({ name }) => {
          const patchPayload = { firebaseKey: name };
          updateVideo(patchPayload)
            .then(() => {
              router.push('/library');
            });
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="mt-5 mb-3">{obj.firebaseKey ? 'Update' : 'Create'} Video</h1>

      {/* VIDEO URL */}
      <FloatingLabel controlId="floatingInput1" label="Video URL" className="mb-3 text-black">
        <Form.Control
          type="url"
          name="video_url"
          value={formInput.video_url}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* VIDEO TITLE */}
      <FloatingLabel controlId="floatingInput2" label="Video Title" className="mb-3 text-black">
        <Form.Control
          type="text"
          name="video_title"
          value={formInput.video_title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* VIDEO DESCRIPTION TEXTAREA */}
      <FloatingLabel controlId="floatingTextArea" label="Video Description" className="mb-3 text-black">
        <Form.Control
          type="textarea"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* VIDEO DESCRIPTION TEXTAREA */}
      <Form.Check
        className="mb-3"
        type="switch"
        id="public"
        name="public"
        label="Make public?"
        checked={formInput.public}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            public: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit" className="blue-btn">{obj.firebaseKey ? 'Update' : 'Create'} Video</Button>
      <Button type="btn" className="mx-2 red-btn" onClick={() => router.back()}>Cancel</Button>

    </Form>
  );
}

VideoForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    video_title: PropTypes.string,
    video_url: PropTypes.string,
    date_added: PropTypes.string,
    description: PropTypes.string,
    uid: PropTypes.string,
    public: PropTypes.bool,
    username: PropTypes.string,
  }),
};

VideoForm.defaultProps = {
  obj: initialState,
};
