import { apiUrl } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const apiRoutes = {
  login: `${apiUrl}/auth/login`,
  user: {
    getAll: `${apiUrl}/users`,
    findByUsername: (username) => `${apiUrl}/users/username/${username}`,
  },
  posts: {
    getByUser: (userId) => `${apiUrl}/users/${userId}/posts`,
    getAll: `${apiUrl}/posts`,
  },
  imageSrc: (src) => `${apiUrl}/ftp/uploads/${src}`,
};
