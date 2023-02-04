import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import Image from 'next/image';
import WhiteLogo from './WhiteLogo';
import ProfileModal from './ProfileModal';
import NavOffcanvas from './Offcanvas';
import SearchBar from './SearchBar';
import { useAuth } from '../utils/context/authContext';
import { signIn } from '../utils/auth';
import userIcon from '../src/assets/images/user_icon.png';

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
              <button type="button" className="signin-btn" onClick={signIn}>
                <Image src={userIcon} alt="search icon" height={20} width={20} /> <p className="signin-p">Sign In</p>
              </button>
            )}
        </div>
      </Navbar>
    </>
  );
}
