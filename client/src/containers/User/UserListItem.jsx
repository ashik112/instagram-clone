import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import './UserListItem.scss';
import imgAlt from '../../assets/alt.jpg';
import { apiRoutes } from '../../routing/apiRoutes';
import historyRoutes from '../../routing/historyRoutes';
import { UserPropTypes } from '../../propTypes';

const UserListItem = ({
  user: {
    name, avatar, username, description,
  },
}) => (
  <div className="m-4">
    <Row className="user-list-item">
      <Col md={1} xs={3} sm={2} lg={1} xl={1}>
        <Link to={historyRoutes.profile(username)}>
          <img
            src={avatar ? apiRoutes.imageSrc(avatar) : imgAlt}
            className="img-avatar"
            alt=""
          />
        </Link>
      </Col>
      <Col md={11} xs={9} sm={10} lg={11} xl={11}>
        <Link className="text-dark" to={historyRoutes.profile(username)}>
          <h4>{name}</h4>
        </Link>
        <span className="blockquote-footer">{description}</span>
      </Col>
    </Row>
    <hr />
  </div>
);

UserListItem.defaultProps = UserPropTypes.defaultProps;

UserListItem.propTypes = UserPropTypes.propTypes;

export default UserListItem;
