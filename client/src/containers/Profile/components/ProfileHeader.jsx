import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import './ProfileHeader.scss';

const ProfileHeader = () => {
  return (
    <Container>
      <Row>
        <Col sm={3} md={3} className="text-center">
          <img
            alt="N/A"
            className="Profile-avatar"
            src="https://avatars3.githubusercontent.com/u/9448239?s=460&u=1bef28fa08aa10787dd00654fc304442ebb92ddc&v=4"
          />
        </Col>
        <Col sm={8} md={8}>
          <Container fluid>
            <Row>
              <Col md={5}>
                <h4 className="text-left align-self-center">
                  ashekur.rahman.khan
                </h4>
              </Col>
              {/*<Col md={4} className="text-left align-self-center">
                <button className="mr-2">Edit Profile</button>
                <GrSettingsOption size={24} />
              </Col>*/}
            </Row>

            <Row className="pt-2 text-left">
              <Col>
                <span className="pr-2"><b>6</b> posts</span>
                <span className="p-2"><b>5</b> likes</span>
                <span className="p-2"><b>6</b> followers</span>
              </Col>
            </Row>
            <Row className="pt-2 text-left">
              <Col><b>Ashekur Rahman Khan</b></Col>
            </Row>

            <Row className="pt-2 text-left">
              <Col>The secret of life, though, is to fall seven times and to get up eight times. <span role="img" aria-label="glass">👓</span></Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileHeader;
