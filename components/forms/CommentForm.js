import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createComment, updateComment } from '../../API/commentsData';

const initialState = {
  firebaseKey: '',
  uid: '',
  text: '',
  video_id: '',
  date_added: '',
  author: '',
};

export default function AddAComment({ videoFbKey, onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();

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
      video_id: videoFbKey,
    };
    createComment(payload)
      .then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateComment(patchPayload)
          .then(() => onUpdate())
          .then(setFormInput(initialState));
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="mt-3 mb-3">Add A Comment</h4>

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
  videoFbKey: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
