/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container } from 'react-bootstrap';
import Logo from './Logo';
import ProfileModal from './ProfileModal';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>

        <div>
          <h1 className="navbar-text">OffCanvas</h1>
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
