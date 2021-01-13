import React from 'react';
import { NavItem, NavLink } from 'reactstrap';

const GuestNavigation = () => {
  return (
    <>
      <NavItem>
        <NavLink href='/signup'>Register</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href='/login'>Login</NavLink>
      </NavItem>
    </>
  );
};

export default GuestNavigation;
