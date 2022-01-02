import React, { useState } from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { useUser } from '@auth0/nextjs-auth0';

import RouterLink from './RouterLink';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useUser();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="nav-container" data-testid="navbar">
      <Navbar color="dark" dark expand="md">
        <Container>
          <RouterLink href="/" className="nav-link" testId="navbar-home">
            <NavbarBrand className="logo" />
          </RouterLink>

          <NavbarToggler onClick={toggle} data-testid="navbar-toggle" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto " navbar data-testid="navbar-items">
              {user && (
                <>
                  <NavItem>
                    <RouterLink
                      href="/csr"
                      className="nav-link ml-2 font-weight-bold h2 text-primary"
                      testId="navbar-csr">
                      the racoon app
                    </RouterLink>
                  </NavItem>
                </>
              )}
            </Nav>
            <Nav className="d-none d-md-flex align-items-center" navbar>
              <RouterLink href="/dashboard">
                <div className="btn btn-danger btn-block btn-lg text-light rounded mr-5">
                  <h3>Dashboard ⚡</h3>
                </div>
              </RouterLink>
              {!isLoading && !user && (
                <NavItem id="qsLoginBtn">
                  <RouterLink
                    href="/api/auth/login"
                    className="btn btn-primary btn-margin"
                    tabIndex={0}
                    testId="navbar-login-desktop">
                    Log in
                  </RouterLink>
                </NavItem>
              )}
              {user && (
                <UncontrolledDropdown nav inNavbar data-testid="navbar-menu-desktop">
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                      height="50"
                      decode="async"
                      data-testid="navbar-picture-desktop"
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header data-testid="navbar-user-desktop">
                      {user.name}
                    </DropdownItem>
                    <DropdownItem className="dropdown-profile" tag="span">
                      <RouterLink href="/profile" icon="user" testId="navbar-profile-desktop">
                        Profile
                      </RouterLink>
                    </DropdownItem>
                    <DropdownItem id="qsLogoutBtn">
                      <RouterLink href="/api/auth/logout" icon="power-off" testId="navbar-logout-desktop">
                        Log out
                      </RouterLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
            {!isLoading && !user && (
              <Nav className="d-md-none" navbar>
                <RouterLink
                  href="/api/auth/login"
                  className="btn btn-primary btn-block"
                  tabIndex={0}
                  testId="navbar-login-mobile">
                  Log in
                </RouterLink>
              </Nav>
            )}
            {user && (
              <Nav
                id="nav-mobile"
                className="d-md-none justify-content-between"
                navbar
                data-testid="navbar-menu-mobile">
                <NavItem>
                  <span className="user-info">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile d-inline-block rounded-circle mr-3"
                      width="50"
                      height="50"
                      decode="async"
                      data-testid="navbar-picture-mobile"
                    />
                    <h6 className="d-inline-block" data-testid="navbar-user-mobile">
                      {user.name}
                    </h6>
                  </span>
                </NavItem>
                <NavItem>
                  <RouterLink href="/profile" icon="user" testId="navbar-profile-mobile">
                    Profile
                  </RouterLink>
                </NavItem>
                <NavItem id="qsLogoutBtn">
                  <RouterLink
                    href="/api/auth/logout"
                    className="btn btn-link p-0"
                    icon="power-off"
                    testId="navbar-logout-mobile">
                    Log out
                  </RouterLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
