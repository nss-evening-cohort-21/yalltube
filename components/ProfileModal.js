import React, { useState } from 'react';
import { Image, Modal } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

export default function ProfileModal() {
  const [show, setShow] = useState(false);
  const { user } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <Image
        src={user.photoURL}
        alt="Picture of the author"
        width="60"
        height="60"
        onClick={handleShow}
        roundedCircle
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Image
            src={user.photoURL}
            alt="Picture of the author"
            width="60"
            height="60"
            onClick={handleShow}
            roundedCircle
          />
        </Modal.Header>
        <Modal.Body>Woohoo, reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
