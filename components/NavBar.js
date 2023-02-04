import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import WhiteLogo from './WhiteLogo';
import ProfileModal from './ProfileModal';
import NavOffcanvas from './Offcanvas';
import SearchBar from './SearchBar';
import { useAuth } from '../utils/context/authContext';
import { signIn } from '../utils/auth';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="navbar">
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
          {user ? <ProfileModal />
            : (
              <Button
                className="signin-btn"
                type="button"
                variant="outline-secondary"
                onClick={signIn}
              >Sign In
              </Button>
            )}
        </div>
      </Navbar>
    </>
  );
}
