const historyRoutes = {
  home: '/',
  login: '/login',
  profile: (username) => `/${username}`,
};

export default historyRoutes;
