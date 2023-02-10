import { useRouter } from 'next/router';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';

const intialState = {
  firebaseKey: '',
  uid: '',
  text: '',
  video_id: '',
  date_added: '',
  author: '',
};

export default function AddAComment({ onUpdate }) {
  const [formInput, setFormInput] = useState(intialState);
  const router = useRouter();
  const { user } = useAuth();
  const { videoFirebaseKey } = router.query;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      uid: user.uid,
      date_added: new Date().toLocaleString(),
      author: user.displayName,
      video_id: videoFirebaseKey,
    };
    // TODO: create comment api call
    console.warn(payload)
      .then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        // TODO: update comment api call
        console.warn(patchPayload)
          .then(() => onUpdate());
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="mt-5 mb-3">Add A Comment</h4>

      <FloatingLabel controlId="floatingTextArea" label="Type your comment here..." className="mb-3 text-black">
        <Form.Control
          type="textarea"
          style={{ height: '100px' }}
          name="text"
          value={formInput.text}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit" className="blue-btn">Submit Comment</Button>
    </Form>
  );
}

AddAComment.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
