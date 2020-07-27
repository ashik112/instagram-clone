/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Col, Row } from 'reactstrap';
import { formatDistanceStrict } from 'date-fns';
import imgAlt from '../../../assets/alt.jpg';
import { apiRoutes } from '../../../routing/apiRoutes';
import { CommentPropTypes } from '../../../propTypes';

const CommentsItem = ({
  comment: {
    id, user: { avatar, username }, content, updatedAt,
  },
}) => (
  <Row key={id}>
    <Col>
      <div className="d-flex justify-content-start align-items-center pt-0 pl-3 pr-3">
        <img
          className="img-avatar align-self-start"
          src={avatar ? apiRoutes.imageSrc(avatar) : imgAlt}
          alt=""
        />
        <div className="pl-2">
          <span>
            <b>{username}</b> <span className="small">{content}</span>
          </span>
          <br />
          <span className="text-muted small">{formatDistanceStrict(new Date(), new Date(updatedAt))}</span>
        </div>
      </div>
    </Col>
  </Row>
);

CommentsItem.propTypes = CommentPropTypes.propTypes;
CommentsItem.defaultProps = CommentPropTypes.defaultProps;

export default CommentsItem;
