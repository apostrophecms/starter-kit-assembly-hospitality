module.exports = {
  // add a route to get all configured locales
  extendRestApiRoutes(self) {
    return {
      get: {
        '/locales': async (req) => {
          return self.getLocales();
        }
      }
    };
  }
};