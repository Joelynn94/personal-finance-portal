import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from 'reactstrap';

import './styles.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar expand='md'>
      <Container>
        <NavbarBrand href='/'>Personal Finance Portal</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <NavLink href='/dashboard'>Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/debts'>Add Debts</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/signup'>Register</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/login'>Login</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Account
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
