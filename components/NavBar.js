import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import WhiteLogo from './WhiteLogo';
import ProfileModal from './ProfileModal';
import NavOffcanvas from './Offcanvas';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <div style={{
          padding: '0px 0px 0px 20px',
        }}
        >
          <NavOffcanvas />
        </div>
        <Link passHref href="/">
          <Navbar.Brand>
            <div style={{
              height: '100px',
              width: '200px',
            }}
            >
              <WhiteLogo />
            </div>
          </Navbar.Brand>
        </Link>
        <Container>
          <Nav className="m-auto">
            <SearchBar />
          </Nav>
        </Container>
        <div style={{
          padding: '0px 20px 0px 0px',
        }}
        >
          <ProfileModal />
        </div>
      </Navbar>
    </>
  );
}
