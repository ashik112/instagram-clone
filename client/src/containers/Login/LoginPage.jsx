// eslint-disable-next-line max-len
/* eslint-disable react/prop-types,jsx-a11y/no-noninteractive-element-to-interactive-role,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';
import { connect } from 'react-redux';
import logo from '../../assets/logo.png';
import authActions from '../../redux/reducers/Authentication/authActions';
import LoginForm from './components/LoginForm';
import './LoginPage.scss';
import history from '../../utils/history';

class LoginPage extends Component {
  componentDidMount() {
    const { stopLoading } = this.props;
    stopLoading();
  }

  render() {
    const { authReducer, onLogIn } = this.props;
    const { loading, error } = authReducer;
    return (
      <Container fluid className="text-center Login-container" style={{ height: '100vh' }}>
        {/* <div className="background-image" /> */}
        <Row style={{ blur: '0 !important' }} className="h-100 justify-content-center align-items-center content">
          <Col md={4}>
            <Card className="Login-card" border="warning">
              <CardBody>
                <div className="text-center mb-5">
                  <img role="button" onClick={() => history.push('/')} className="img-fluid" src={logo} alt="Instagram" />
                </div>
                <LoginForm loading={loading} onLogIn={onLogIn} />
                { error && (
                  <div className="text-center">
                    <hr />
                    <span className="text-danger small">Sorry, your password was incorrect. Please double-check your password.</span>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { authReducer } = state;
  return {
    authReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLogIn: (credentials) => dispatch(
    authActions.login(
      credentials,
    ),
  ),
  stopLoading: () => dispatch(authActions.stopLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
