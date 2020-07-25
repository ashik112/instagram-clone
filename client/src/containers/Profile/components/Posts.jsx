// eslint-disable-next-line max-len
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role,react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { MdGridOn } from 'react-icons/md';
import { Container, Row, Col } from 'reactstrap';
import './Posts.scss';
import { BsFillHeartFill, BsFillChatFill } from 'react-icons/bs';
import axios from '../../../utils/axios';
import { apiUrl } from '../../../constants';

// eslint-disable-next-line react/prop-types
const Posts = ({ user }) => {
  // eslint-disable-next-line react/prop-types
  const { id } = user;
  const [posts, setPosts] = useState([]);
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
        <Row xs={3} md={3}>
          {
            posts.map((post) => (
              <Col key={post.id} className="mb-4">
                <div className="Posts-img-container" role="button">
                  <img
                    role="button"
                    className="Posts-img"
                    src={`${apiUrl}/ftp/uploads/${post.photo}`}
                    alt="N/A"
                  />
                  <div className="overlay">
                    <div className="Posts-img-text d-flex align-items-center align-middle">
                      <span className="mr-3"><BsFillHeartFill /> {post.comments && post.comments.length}</span>
                      <span className="ml-3"><BsFillChatFill /> {post.likes && post.likes.length}</span>
                    </div>
                  </div>
                </div>
              </Col>
            ))
          }
        </Row>
      </Container>
    </div>
  );
};

export default Posts;
