/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container } from 'react-bootstrap';
import Logo from './Logo';
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

      </Container>
    </Navbar>
  );
}
