module.exports = function(site, config) {
  options = {
    alias: 'theme',
    // Silence startup warning about the lack of code since this
    // is just an empty starting point for your own work
    ignoreNoCodeWarning: true,
    // Silence startup warning displayed if this module is
    // not activated at all, since only one theme module
    // will be activated per site
    ignoreUnusedFolderWarning: true
  };
};
