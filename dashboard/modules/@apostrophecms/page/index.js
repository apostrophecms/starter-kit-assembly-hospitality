export default {
  methods(self, options) {
    return {
      async serveNotFound(req) {
        if (!req.user) {
          req.redirect = '/login';
          return;
        }
        if (self.isFound(req)) {
          return;
        }
        req.redirect = '/login';
      }
    };
  }
};
