import React, { useState } from 'react';
import {
  Card, Image, Modal, ModalBody,
} from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';
import styles from '../styles/ProfileModal.module.css';

export default function ProfileModal() {
  const [show, setShow] = useState(false);
  const { user } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Image
        src={user.photoURL}
        alt="Picture of the user"
        width="60"
        height="60"
        onClick={handleShow}
        roundedCircle
      />

      <Modal show={show} onHide={handleClose}>
        <ModalBody className={styles.profileModal}>
          <Modal.Header>
            <Image
              src={user.photoURL}
              alt="Picture of the user"
              width="60"
              height="60"
              onClick={handleShow}
              roundedCircle
            />
            <div>
              <h6>{user.displayName}</h6>
              <h6>{user.email}</h6>
            </div>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <Link passHref href="/library">
              <Card.Text onClick={handleClose} className={styles.modalLink}>
                Your channel
              </Card.Text>
            </Link>
            <Link passHref href="/">
              <Card.Text onClick={signOut} className={styles.modalLink}>
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
