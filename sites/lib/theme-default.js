export default function(site, config) {
  config.modules = {
    ...config.modules,
    
    // Theme specific Assets and Helpers
    'theme-default': {},

    // Theme specific Pieces
    product: {},
    'team-member': {},

    // Related Pieces Widgets
    'product-widget': {},
    'team-member-widget': {}
  };
};