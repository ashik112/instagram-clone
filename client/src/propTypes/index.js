import PropTypes from 'prop-types';

export const UserPropTypes = {
  defaultProps: {
    user: {
      name: '',
      avatar: '',
      username: '',
      description: '',
      statistics: {
        totalPosts: 0,
        totalFollowers: 0,
        totalFollowings: 0,
      },
    },
  },
  propTypes: {
    user: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
      username: PropTypes.string,
      description: PropTypes.string,
      statistics: PropTypes.shape({
        totalPosts: PropTypes.number,
        totalFollowers: PropTypes.number,
        totalFollowings: PropTypes.number,
      }),
    }),
  },
};

export const PostPropTypes = {
  defaultProps: {
    post: {
      comments: [],
      createdAt: '',
      description: '',
      id: null,
      likes: [],
      photo: '',
      updatedAt: '',
      userId: null,
      user: {
        ...UserPropTypes.defaultProps,
      },
    },
  },
  propTypes: {
    post: PropTypes.shape({
      comments: PropTypes.arrayOf(PropTypes.shape()),
      createdAt: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.number,
      likes: PropTypes.arrayOf(PropTypes.shape()),
      photo: PropTypes.string,
      updatedAt: PropTypes.string,
      userId: PropTypes.number,
      user: PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.string,
        username: PropTypes.string,
      }),
    }),
  },
};

export const CommentPropTypes = {
  defaultProps: {
    comment: {
      createdAt: '',
      content: '',
      id: null,
      updatedAt: '',
      userId: null,
      user: {
        ...UserPropTypes.defaultProps,
      },
    },
  },
  propTypes: {
    comment: PropTypes.shape({
      updatedAt: PropTypes.string,
      createdAt: PropTypes.string,
      content: PropTypes.string,
      id: PropTypes.number,
      userId: PropTypes.number,
      user: PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.string,
        username: PropTypes.string,
      }),
    }),
  },
};
