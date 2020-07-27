// eslint-disable-next-line max-len
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role,jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus,react/prop-types,react/jsx-one-expression-per-line */
import React from 'react';
import { BsFillChatFill, BsFillHeartFill } from 'react-icons/bs';
import { Col } from 'reactstrap';
import './PostImage.scss';
import { apiRoutes } from '../../routing/apiRoutes';

const PostImage = ({ post, postIndex, onClick }) => (
  <>
    <Col key={post.id} className="mb-4">
      <div onClick={() => onClick(post, postIndex)} className="post-img-container" role="button">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <img
          role="button"
          className="post-img"
          src={apiRoutes.imageSrc(post.photo)}
          alt=""
        />
        <div className="overlay">
          <div className="post-img-text d-flex align-items-center align-middle">
            <span className="mr-3">
              <BsFillHeartFill /> {post.likes && post.likes.length}
            </span>
            <span className="ml-3">
              <BsFillChatFill /> {post.comments && post.comments.length}
            </span>
          </div>
        </div>
      </div>
    </Col>
  </>
);

export default PostImage;
