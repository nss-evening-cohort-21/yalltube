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
          <Modal.Body>
            <Link passHref href="/library">
              <Card.Link href="" onClick={handleClose}>
                Your channel
              </Card.Link>
            </Link>
            <br />
            <Link passHref href="/">
              <Card.Link href="" onClick={signOut}>
                Sign out
              </Card.Link>
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
