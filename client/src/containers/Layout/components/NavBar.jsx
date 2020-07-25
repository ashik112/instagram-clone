// eslint-disable-next-line max-len
/* eslint-disable react/prop-types,jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus,react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import {
  Row, Col, Button, Input, InputGroup, InputGroupAddon, InputGroupText,
  Dropdown, DropdownMenu, DropdownToggle, DropdownItem,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import { FiSearch } from 'react-icons/fi';
import { BsPeopleCircle } from 'react-icons/bs';
import logo from '../../../assets/logo.png';
import history from '../../../utils/history';
import historyRoutes from '../../../routing/historyRoutes';
import { apiUrl } from '../../../constants';
import authActions from '../../../redux/reducers/Authentication/authActions';
import imgAlt from '../../../assets/alt.jpg';

// eslint-disable-next-line react/prop-types
const NavBar = ({ authReducer, logOut }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // eslint-disable-next-line react/prop-types
  const { token, user } = authReducer;
  return (
    <>
      <nav className="Nav Compact">
        <>
          <Row className="Nav-menus">
            <Col md={6} sm={6} lg={6} xs={6}>
              <Link to="/">
                <img src={logo} alt="Instagram" />
              </Link>
            </Col>
            {/* <Col className="text-center" md={4} sm={4} lg={4} xs={4}>
              <InputGroup size="sm">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><FiSearch /></InputGroupText>
                </InputGroupAddon>
                <Input bsSize="sm" type="text" placeholder="Search" />
              </InputGroup>
            </Col> */}
            <Col className="text-right" md={6} sm={6} lg={6} xs={6}>
              {
                (token && user && (
                  <Dropdown isOpen={isDropdownOpen} toggle={() => setDropdownOpen(!isDropdownOpen)}>
                    <DropdownToggle
                      tag="span"
                      data-toggle="dropdown"
                      aria-expanded={isDropdownOpen}
                    >

                      <a className="Nav-Item" role="button">
                        <img
                          src={user.avatar ? `${apiUrl}/ftp/uploads/${user.avatar}` : imgAlt}
                          alt=""
                        />
                      </a>
                    </DropdownToggle>
                    <DropdownMenu
                      right
                      className="mt-2"
                    >
                      <DropdownItem onClick={() => history.push(`/${user.username}`)}>
                        <span className="align-middle">
                          <span><BsPeopleCircle />&nbsp;&nbsp;&nbsp;Profile</span>
                        </span>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={() => logOut()}>Sign Out</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                )) || (
                  <>
                    <Button onClick={() => history.push(historyRoutes.login)} size="sm" color="secondary">Sign In</Button>
                  </>
                )
              }
            </Col>
          </Row>
        </>
      </nav>
    </>
  );
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(authActions.logout()),
  stopLoading: () => dispatch(authActions.stopLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
