// eslint-disable-next-line max-len
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role,react/jsx-one-expression-per-line,jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Modal,
} from 'reactstrap';
import './Posts.scss';
import { BsFillHeartFill, BsFillChatFill } from 'react-icons/bs';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft, MdGridOn } from 'react-icons/md';
import axios from '../../../utils/axios';
import { apiUrl } from '../../../constants';

// eslint-disable-next-line react/prop-types
const Posts = ({ user }) => {
  // eslint-disable-next-line react/prop-types
  const { id } = user;
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  useEffect(() => {
    axios.get(`${apiUrl}/users/${id}/posts`).then((res) => {
      setPosts([...res.data]);
    });
  }, [id]);
  return (
    <div className="mt-5 text-center">
      <span className="small text-grey align-middle">
        <MdGridOn size={12} /> POSTS
      </span>
      <hr />
      <Container className="mt-3">
        <Row xs={1} sm={2} md={3}>
          {
            posts.map((post) => (
              <Col key={post.id} className="mb-4">
                {/* eslint-disable-next-line max-len */}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */}
                <div onClick={() => setSelectedPost(post)} className="gallery Posts-img-container" role="button">
                  <img
                    role="button"
                    className="Posts-img"
                    src={`${apiUrl}/ftp/uploads/${post.photo}`}
                    alt="N/A"
                  />
                  <div className="overlay">
                    <div className="Posts-img-text d-flex align-items-center align-middle">
                      <span className="mr-3"><BsFillHeartFill /> {post.likes && post.likes.length}</span>
                      <span className="ml-3"><BsFillChatFill /> {post.comments && post.comments.length}</span>
                    </div>
                  </div>
                </div>
              </Col>
            ))
          }
        </Row>
      </Container>
      {
        selectedPost && (
          <Modal
            className="Compact"
            isOpen
            external={(
              <a
                type="button"
                className="close text-light"
                style={{ position: 'absolute', top: '15px', right: '15px' }}
                onClick={() => setSelectedPost(null)}
              >
                &times;
              </a>
            )}
          >
            <div>
              <Row className="m-0 p-0">
                <Col className="p-0 m-0" md={9}>
                  <div className="d-flex justify-content-center align-items-center Posts-modal-img-container">
                    <img
                      className="Posts-modal-img align-self-center"
                      src={`${apiUrl}/ftp/uploads/${selectedPost.photo}`}
                      alt="N/A"
                    />
                  </div>
                </Col>
                <Col className="p-0 m-0  Posts-sidebar-container" md={3}>
                  <div className="d-flex border-bottom justify-content-start align-items-center p-3">
                    <img
                      className="img-avatar"
                      src={`${apiUrl}/ftp/uploads/${selectedPost.user.avatar}`}
                      alt="N/A"
                    />
                    <div>
                      <h5 className="pl-2">{selectedPost.user.name}</h5>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <a
              type="button"
              className="close text-light"
              style={{ position: 'absolute', top: '48%', right: '-30px' }}
            >
              <MdKeyboardArrowRight />
            </a>
            <a
              type="button"
              className="close text-light"
              style={{ position: 'absolute', top: '48%', left: '-30px' }}
            >
              <MdKeyboardArrowLeft />
            </a>
          </Modal>
        )
      }
    </div>
  );
};

export default Posts;
