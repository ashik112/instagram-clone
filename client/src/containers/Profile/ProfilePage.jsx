import React from 'react';
import { Row, Col } from 'reactstrap';
import ProfileHeader from './components/ProfileHeader';
import Posts from './components/Posts';

const ProfilePage = (props) => {
  console.log(props);
  return (
    <>
      <Row>
        <Col>
          <ProfileHeader />
        </Col>
      </Row>
      <Row className="pt-2">
        <Col>
          <Posts />
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
