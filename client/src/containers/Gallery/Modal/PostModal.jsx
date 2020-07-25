// eslint-disable-next-line max-len
/* eslint-disable react/prop-types,react/jsx-one-expression-per-line,jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Col, Modal, Row } from 'reactstrap';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { BsHeart, BsChat } from 'react-icons/bs';
import { apiUrl } from '../../../constants';
import CommentsHeader from './CommentsHeader';
import CommentsItem from './CommentsItem';
import './PostModal.scss';
import imgAlt from '../../../assets/alt.jpg';

const PostModal = ({
  post, postsLength, onClose, onClickNext, postIndex, onClickPrevious,
}) => (
  <Modal
    toggle={onClose}
    className="Compact"
    isOpen
    external={(
      <a
        type="button"
        className="close text-light"
        style={{ position: 'absolute', top: '15px', right: '15px' }}
        onClick={onClose}
      >
        &times;
      </a>
    )}
  >
    <div>
      <Row className="m-0 p-0">
        <Col className="p-0 m-0" md={9}>
          <div className="post-modal-img__container d-flex justify-content-center align-items-center">
            <img
              className="post-modal-img align-self-center"
              src={`${apiUrl}/ftp/uploads/${post.photo}`}
              alt=""
            />
          </div>
        </Col>
        <Col className="p-0 m-0 overflow-hidden" md={3}>
          <div className="sidebar">
            <div className="sidebar-header">
              <div className="d-flex border-bottom justify-content-start align-items-center p-3">
                <img
                  className="img-avatar"
                  src={post.user.avatar ? `${apiUrl}/ftp/uploads/${post.user.avatar}` : imgAlt}
                  alt=""
                />
                <div className="pl-2">
                  <span><b>{post.user.username}</b></span>
                </div>
              </div>
            </div>
            <div className="sidebar-body">
              <div className="comment-list">
                <CommentsHeader post={post} />
                {
                  post.comments && post.comments.map((comment) => (
                    <div key={comment.id} className="pb-3">
                      <CommentsItem comment={comment} />
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="sidebar-footer border-top align-middle">
              <span>
                <b><BsHeart /> {post.likes.length}</b> {post.likes.length > 1 ? 'likes' : 'like' }
                &nbsp;&nbsp;&nbsp;
                <b><BsChat /> {post.comments.length}</b> {post.comments.length > 1 ? 'comments' : 'comment' }
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    {
      postIndex < postsLength - 1 && (
        <a
          onClick={onClickNext}
          type="button"
          className="close text-light"
          style={{ position: 'absolute', top: '48%', right: '-50px' }}
        >
          <MdKeyboardArrowRight size={48} />
        </a>
      )
    }
    {
      postIndex > 0 && (
        <a
          onClick={onClickPrevious}
          type="button"
          className="close text-light"
          style={{ position: 'absolute', top: '48%', left: '-50px' }}
        >
          <MdKeyboardArrowLeft size={48} />
        </a>
      )
    }
  </Modal>
);

export default PostModal;
