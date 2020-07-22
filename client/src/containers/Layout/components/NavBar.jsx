import React from 'react';
import { Row, Col, Button, Input } from 'reactstrap';
import { connect } from 'react-redux';
import './NavBar.scss';
import logo from '../../../assets/logo.png';
import history from '../../../utils/history';
import historyRoutes from '../../../routing/historyRoutes';

const NavBar = ({ authReducer }) => {
  const { token } = authReducer;
  return (
    <>
      <nav className="Nav Compact">
        <>
          <Row className="Nav-menus">
            <Col md={4} sm={4} lg={4} xs={4}>
              <img role="button" src={logo} alt="Instagram" />
            </Col>
            <Col className="text-center" md={4} sm={4} lg={4} xs={4}>
              <Input bsSize="sm" type="text" />
            </Col>
            <Col className="text-right" md={4} sm={4} lg={4} xs={4}>
              {
                (token && (
                  <span role="button" className="Nav-Item">
                    <img src="https://avatars3.githubusercontent.com/u/9448239?s=460&u=1bef28fa08aa10787dd00654fc304442ebb92ddc&v=4" alt="N?A" />
                  </span>
                )) || (
                  <>
                    <Button onClick={() => history.push(historyRoutes.login)} size="sm" color="primary">Sign In</Button>
                  </>
                )
              }
            </Col>
          </Row>
        </>
      </nav>
    </>
  );
}

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, null)(NavBar);
