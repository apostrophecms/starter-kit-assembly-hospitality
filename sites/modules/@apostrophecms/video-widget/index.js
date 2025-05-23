export default {
  options: {
    className: 'apos-video-widget'
  },
  fields: {
    add: {
      _overlay: {
        type: 'relationship',
        withType: '@apostrophecms/image',
        help: 'Overlay Image'
      },
      background: {
        type: 'boolean',
        def: false,
        help: 'Vimeo supports this attribute.'
      }
    }
  }
}
