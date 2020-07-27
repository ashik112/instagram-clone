// eslint-disable-next-line max-len
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role,react/jsx-one-expression-per-line,jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import {
  Container, Row,
} from 'reactstrap';
import './Posts.scss';
import { MdGridOn } from 'react-icons/md';
import axios from '../../utils/axios';
import PostModal from './Modal/PostModal';
import PostImage from './PostImage';
import { apiRoutes } from '../../routing/apiRoutes';
import { UserPropTypes } from '../../propTypes';

const Posts = ({ user }) => {
  // eslint-disable-next-line react/prop-types
  const { id } = user;
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  useEffect(() => {
    axios.get(apiRoutes.posts.getByUser(id)).then((res) => {
      setPosts([...res.data]);
    });
  }, [id]);
  const onSelectPost = (post, index) => {
    setSelectedPost(post);
    setSelectedIndex(index);
  };
  const onClosePostModal = () => {
    setSelectedPost(null);
    setSelectedIndex(null);
  };
  const onClickNext = () => {
    if (posts[selectedIndex + 1]) {
      setSelectedPost(posts[selectedIndex + 1]);
      setSelectedIndex(selectedIndex + 1);
    }
  };
  const onClickPrevious = () => {
    if (posts[selectedIndex - 1]) {
      setSelectedPost(posts[selectedIndex - 1]);
      setSelectedIndex(selectedIndex - 1);
    }
  };
  return (
    <div className="mt-5 text-center">
      <span className="small text-grey align-middle">
        <MdGridOn size={12} /> POSTS
      </span>
      <hr />
      <Container className="mt-3 p-0">
        <Row xs={1} sm={2} md={3} lg={3}>
          {
            posts.map((post, index) => (
              <PostImage key={post.id} postIndex={index} post={post} onClick={onSelectPost} />
            ))
          }
        </Row>
      </Container>
      {
        selectedPost && (
          <PostModal
            post={selectedPost}
            onClickNext={onClickNext}
            onClickPrevious={onClickPrevious}
            onClose={onClosePostModal}
            postIndex={selectedIndex}
            postsLength={posts.length}
          />
        )
      }
    </div>
  );
};

Posts.propTypes = UserPropTypes.propTypes;
Posts.defaultProps = UserPropTypes.defaultProps;

export default Posts;
