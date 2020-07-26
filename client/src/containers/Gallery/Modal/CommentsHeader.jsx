/* eslint-disable react/prop-types,react/jsx-one-expression-per-line */
import React from 'react';
import { Col, Row } from 'reactstrap';
import { formatDistanceStrict } from 'date-fns';
import { apiRoutes } from '../../../routing/apiRoutes';

const CommentsHeader = ({ post }) => (
  <Row>
    <Col>
      <div className="d-flex justify-content-start align-items-center p-3">
        <img
          className="img-avatar align-self-start"
          src={apiRoutes.imageSrc(post.user.avatar)}
          alt=""
        />
        <div className="pl-2">
          <span><b>{post.user.username}</b> <span className="small">{post.description}</span></span>
          <br />
          <span className="text-muted small">{formatDistanceStrict(new Date(), new Date(post.updatedAt))}</span>
        </div>
      </div>
    </Col>
  </Row>
);

export default CommentsHeader;
