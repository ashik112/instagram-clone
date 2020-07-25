import React from 'react';
import {
  Row, Col, Button, Input, InputGroup, InputGroupAddon, InputGroupText,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import { FiSearch } from 'react-icons/fi';
import logo from '../../../assets/logo.png';
import history from '../../../utils/history';
import historyRoutes from '../../../routing/historyRoutes';

// eslint-disable-next-line react/prop-types
const NavBar = ({ authReducer }) => {
  // eslint-disable-next-line react/prop-types
  const { token } = authReducer;
  return (
    <>
      <nav className="Nav Compact">
        <>
          <Row className="Nav-menus">
            <Col md={4} sm={4} lg={4} xs={4}>
              <Link to="/">
                <img src={logo} alt="Instagram" />
              </Link>
            </Col>
            <Col className="text-center" md={4} sm={4} lg={4} xs={4}>
              <InputGroup size="sm">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText><FiSearch /></InputGroupText>
                </InputGroupAddon>
                <Input bsSize="sm" type="text" placeholder="Search" />
              </InputGroup>
            </Col>
            <Col className="text-right" md={4} sm={4} lg={4} xs={4}>
              {
                (token && (
                  <span role="button" className="Nav-Item">
                    <img src="https://avatars3.githubusercontent.com/u/9448239?s=460&u=1bef28fa08aa10787dd00654fc304442ebb92ddc&v=4" alt="N?A" />
                  </span>
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
export default connect(mapStateToProps, null)(NavBar);
