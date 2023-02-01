import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
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
      const payload = { ...formInput, uid: user.uid, date_added: new Date().prototype.toLocaleString() };
      createVideo(payload)
        .then(({ name }) => {
          const patchPayload = { firebaseKey: name };
          updateVideo(patchPayload)
            .then(() => {
              router.push('/videos');
            });
        });
    }
  };

  return (
    <div>VideoForm</div>
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
  }),
};

VideoForm.defaultProps = {
  obj: initialState,
};
