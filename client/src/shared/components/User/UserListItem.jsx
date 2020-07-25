import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import './UserListItem.scss';
import { apiUrl } from '../../../constants';

const UserListItem = ({
  user: {
    name, avatar, username, description,
  },
}) => (
  <div className="m-4">
    <Row className="user-list-item">
      <Col md={1} xs={3} sm={2} lg={1} xl={1}>
        <Link to={`/${username}`}>
          <img
            src={`${apiUrl}/ftp/uploads/${avatar}`}
            className="img-avatar"
            alt="N/A"
          />
        </Link>
      </Col>
      <Col md={11} xs={9} sm={10} lg={11} xl={11}>
        <Link className="text-dark" to={`/${username}`}>
          <h4>{name}</h4>
        </Link>
        <span className="blockquote-footer">{description}</span>
      </Col>
    </Row>
    <hr />
  </div>
);

UserListItem.defaultProps = {
  user: {
    name: '',
    avatar: '',
    username: '',
    description: '',
  },
};

UserListItem.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
    username: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default UserListItem;
