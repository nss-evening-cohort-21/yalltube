import React from 'react';
import Link from 'next/link';
import { Navbar, Container } from 'react-bootstrap';
import Logo from './Logo';
import ProfileModal from './ProfileModal';
import NavOffcanvas from './Offcanvas';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>

        <div>
          <NavOffcanvas />
        </div>

        <Link passHref href="/">
          <div style={{
            maxWidth: '80px',
          }}
          >
            <Logo />
          </div>
        </Link>

        <div>
          <input type="text" placeholder="Search" />
        </div>
        <ProfileModal />

      </Container>
    </Navbar>
  );
}
