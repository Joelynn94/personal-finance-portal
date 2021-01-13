import React, { useState, useContext } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Container,
} from 'reactstrap';
import AuthContext from '../../context/auth/authContext';
import AuthNavigation from './AuthNavigation';
import GuestNavigation from './GuestNavigation';

import './styles.css';

const Navigation = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar expand='md'>
      <Container>
        <NavbarBrand href='/'>Personal Finance Portal</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            {isAuthenticated ? <AuthNavigation /> : <GuestNavigation />}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
