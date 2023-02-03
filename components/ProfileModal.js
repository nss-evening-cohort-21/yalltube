import React, { useState } from 'react';
import {
  Card, Image, Modal, ModalBody, ModalTitle,
} from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function ProfileModal() {
  const [show, setShow] = useState(false);
  const { user } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Image
        src={user.photoURL}
        alt="Picture of the author"
        width="60"
        height="60"
        onClick={handleShow}
        roundedCircle
      />

      <Modal show={show} onHide={handleClose}>
        <ModalBody className="profile-modal">
          <Modal.Header>
            <Image
              src={user.photoURL}
              alt="Picture of the author"
              width="60"
              height="60"
              onClick={handleShow}
              roundedCircle
            />
            <div>
              <ModalTitle>{user.displayName}</ModalTitle>
              <ModalTitle>{user.email}</ModalTitle>
            </div>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column">
            <Link passHref href="/library">
              <Card.Text onClick={handleClose} className="modal-link">
                Your channel
              </Card.Text>
            </Link>
            <br />
            <Link passHref href="/">
              <Card.Text onClick={signOut} className="modal-link">
                Sign out
              </Card.Text>
            </Link>
          </Modal.Body>
          <Modal.Footer>
            Last Login Date {new Date(user.metadata.lastSignInTime).toLocaleDateString()}
          </Modal.Footer>
        </ModalBody>
      </Modal>
    </>
  );
}
