import React, { useContext } from 'react';
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import AuthContext from '../../context/auth/authContext';

const AuthNavigation = () => {
  const { userLogout, user } = useContext(AuthContext);

  const onLogout = () => {
    userLogout();
  };

  return (
    <>
      <NavItem>
        <NavLink href='/dashboard'>Dashboard</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href='/debts'>Add Debts</NavLink>
      </NavItem>
      <NavItem>
        <NavLink disabled>Welcome, {user && user.user_name}!</NavLink>
      </NavItem>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Account
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={onLogout}>Logout</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

export default AuthNavigation;
