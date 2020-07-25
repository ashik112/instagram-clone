// eslint-disable-next-line max-len
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role,react/jsx-one-expression-per-line */
import React, {useEffect, useState} from 'react';
import { MdGridOn } from 'react-icons/md';
import { Container, Row, Col } from 'reactstrap';
import './Posts.scss';
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
      <hr />
      <span className="small">
        <MdGridOn size={16} /> POSTS
      </span>
      <Container className="mt-3">
        <Row xs={3} md={3}>
          {
            posts.map((post) => (
              <Col key={post.id} className="mb-4">
                <img
                  role="button"
                  className="Posts-img"
                  src={`${apiUrl}/ftp/uploads/${post.photo}`}
                  alt="N/A"
                />
              </Col>
            ))
          }
        </Row>
      </Container>
    </div>
  );
};

export default Posts;
