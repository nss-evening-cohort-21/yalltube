import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Form } from 'react-bootstrap';
import WhiteLogo from './WhiteLogo';
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
          <Navbar.Brand>
            <div style={{
              padding: '0px',
              maxWidth: '100px',
              margin: '0',
            }}
            >
              <WhiteLogo />
            </div>
          </Navbar.Brand>
        </Link>

        <Form>
          <Form.Control type="text" placeholder="Search" />
          {/* <Form.Control.Feedback>
                <span style={{ top: '5px' }}>
                    <FontAwesome name="check" spin key="icon" />
                </span>
              </Form.Control.Feedback> */}
        </Form>
        <ProfileModal />

      </Container>
    </Navbar>
  );
}
