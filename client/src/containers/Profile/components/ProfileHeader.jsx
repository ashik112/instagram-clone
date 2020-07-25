/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import './ProfileHeader.scss';
import { apiUrl } from '../../../constants';

// eslint-disable-next-line react/prop-types
const ProfileHeader = ({ user }) => {
  const {
    // eslint-disable-next-line react/prop-types,max-len
    name, username, description, avatar, statistics: { totalPosts, totalFollowers, totalFollowings },
  } = user;
  return (
    <Container>
      <Row>
        <Col sm={3} md={3} className="text-center">
          <img
            alt=""
            className="Profile-avatar"
            src={`${apiUrl}/ftp/uploads/${avatar}`}
          />
        </Col>
        <Col sm={8} md={8}>
          <Container fluid>
            <Row>
              <Col md={5}>
                <h4 className="text-left align-self-center">
                  {username}
                </h4>
              </Col>
              {/* <Col md={4} className="text-left align-self-center">
                <button className="mr-2">Edit Profile</button>
                <GrSettingsOption size={24} />
              </Col> */}
            </Row>

            <Row className="pt-2 text-left">
              <Col>
                <span className="pr-2">
                  <b>{totalPosts}</b> {totalPosts > 1 ? 'posts' : 'post'}
                </span>
                <span className="p-2">
                  <b>{totalFollowers}</b> {totalFollowers > 1 ? 'followers' : 'follower'}
                </span>
                <span className="p-2">
                  <b>{totalFollowings}</b> following
                </span>
              </Col>
            </Row>
            <Row className="pt-2 text-left">
              <Col><b>{name}</b></Col>
            </Row>

            <Row className="pt-2 text-left">
              <Col>
                {description}
                {/* <span role="img" aria-label="glass">👓</span> */}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileHeader;
