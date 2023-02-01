import React, { useState } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import BlackLogo from './BlackLogo';

export default function NavOffcanvas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        &#9776;
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><BlackLogo /></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Link href="/" passHref>
            <Button variant="danger" type="button" size="lg" className="copy-btn m-2" onClick={handleClose}>
              &#8962; Home
            </Button>
          </Link>
          <Link href="/library" passHref>
            <Button variant="danger" type="button" size="lg" className="copy-btn m-2" onClick={handleClose}>
              &#128214; Library
            </Button>
          </Link>
          <Link href="/video/new" passHref>
            <Button variant="danger" type="button" size="lg" className="copy-btn m-2" onClick={handleClose}>
              &#128249; Add a Video
            </Button>
          </Link>
          <Link href="/" passHref>
            <Button variant="danger" type="button" size="lg" className="copy-btn m-2" onClick={handleClose}>
              &#127911; Playlists
            </Button>
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
