export default {
  options: {
    // When not in production, refresh the page on restart
    refreshOnRestart: true,
    hmr: 'apos'
  },
  methods(self) {
    return {
      getNamespace() {
        return self.apos.options.theme;
      }
    };
  }
};
