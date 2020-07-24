// eslint-disable-next-line max-len
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role,react/jsx-one-expression-per-line */
import React from 'react';
import { MdGridOn } from 'react-icons/md';
import { Container, Row, Col } from 'reactstrap';
import './Posts.scss';

const Posts = () => (
  <div className="mt-5 text-center">
    <hr />
    <span className="small">
      <MdGridOn size={16} /> POSTS
    </span>
    <Container className="mt-3">
      <Row xs={3} md={3}>
        <Col className="mb-4">
          <img
            role="button"
            className="Posts-img"
            src="https://avatars3.githubusercontent.com/u/9448239?s=460&u=1bef28fa08aa10787dd00654fc304442ebb92ddc&v=4"
            alt="N/A"
          />
        </Col>
        <Col className="mb-4">
          <img
            role="button"
            className="Posts-img"
            alt="N/A"
            src="https://instagram.fdac22-1.fna.fbcdn.net/v/t51.2885-19/s150x150/110007780_280857393183090_1023003285823742901_n.jpg?_nc_ht=instagram.fdac22-1.fna.fbcdn.net&_nc_ohc=HPY-HB3pdbMAX-G7zXh&oh=9b62627dab018d399c24a6508b6947ba&oe=5F41702B"
          />
        </Col>
        <Col role="button" className="mb-4">
          <img
            role="button"
            className="Posts-img"
            alt="N/A"
            src="https://avatars3.githubusercontent.com/u/9448239?s=460&u=1bef28fa08aa10787dd00654fc304442ebb92ddc&v=4"
          />
        </Col>
      </Row>
    </Container>
  </div>
);

export default Posts;
