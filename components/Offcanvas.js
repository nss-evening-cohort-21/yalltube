import React, { useState } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import WhiteLogo from './WhiteLogo';

export default function NavOffcanvas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="dark" className="hamburger-btn" onClick={handleShow} size="lg">
        &#9776;
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Link href="/" passHref>
          <Offcanvas.Title onClick={handleClose}><WhiteLogo /></Offcanvas.Title>
        </Link>
        <Offcanvas.Body>
          <Link href="/" passHref>
            <Button variant="danger" type="button" size="lg" className="copy-btn m-2 offcanvas-btn" onClick={handleClose}>
              &#8962; Home
            </Button>
          </Link>
          <Link href="/library" passHref>
            <Button variant="danger" type="button" size="lg" className="copy-btn m-2 offcanvas-btn" onClick={handleClose}>
              &#128214; Library
            </Button>
          </Link>
          <Link href="/video/new" passHref>
            <Button variant="danger" type="button" size="lg" className="copy-btn m-2 offcanvas-btn" onClick={handleClose}>
              &#128249; Add a Video
            </Button>
          </Link>
          <Link href="/" passHref>
            <Button variant="danger" type="button" size="lg" className="copy-btn m-2 offcanvas-btn" onClick={handleClose}>
              &#127911; Playlists
            </Button>
          </Link>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
