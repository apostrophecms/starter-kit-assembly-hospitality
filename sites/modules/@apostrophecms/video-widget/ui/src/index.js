console.log('LOADING');

export default () => {
  console.log('INSTALLING');
  apos.oembedCache ||= {};
  apos.util.widgetPlayers['@apostrophecms/video'] = {
    selector: '[data-apos-video-widget]',
    player: function(el) {
      const videoUrl = el.getAttribute('data-apos-video-url');
      let queryResult;

      if (!videoUrl) {
        return;
      }

      queryAndPlay(el, {
        url: videoUrl
      });

      function queryAndPlay(el, options) {
        apos.util.removeClass(el, 'apos-oembed-invalid');
        apos.util.addClass(el, 'apos-oembed-busy');
        if (!options.url) {
          return fail('undefined');
        }
        return query(options, function(err, result) {
          queryResult = result;
          if (err || (options.type && (result.type !== options.type))) {
            return fail(err || 'inappropriate');
          }
          apos.util.removeClass(el, 'apos-oembed-busy');
          return play(el, result);
        });
      }

      function query(options, callback) {
        if (Object.hasOwn(apos.oembedCache, options.url)) {
          return callback(null, apos.oembedCache[options.url]);
        }
        const opts = {
          qs: {
            url: options.url
          }
        };
        return apos.http.get('/api/v1/@apostrophecms/oembed/query', opts, function(err, result) {
          if (err) {
            return callback(err);
          }
          apos.oembedCache[options.url] = result;
          return callback(null, result);
        });
      }

      function play(el, result) {
        console.log('IN PLAY');
        // Use aspect-ratio to eliminate the need for any timeout at all
        const shaker = document.createElement('div');

        let html = result.html;
        if (el.hasAttribute('data-background')) {
          html = html.replace(/"(https:\/\/player.vimeo.com\/video\/[^\"]+)"/, (all, url) => {
            console.log('MATCH');
            if (url.includes('?')) {
              url += '&background=1';
            } else {
              url += '?background=1';
            }
            return `"${url}"`;
          });
          console.log('NEW HTML:', html);
        }

        let before = false;

        el.style.position = 'relative';

        if (el.hasAttribute('data-overlay')) {
          before = document.createElement('img');
          before.setAttribute('src', el.getAttribute('data-overlay'));
          before.setAttribute('class', 'apos-video-overlay');
          before.style.position = 'absolute';
        }

        shaker.innerHTML = html;
        const inner = shaker.firstChild;
        inner.setAttribute('data-apos-video-canvas', '');
        el.innerHTML = '';
        if (!inner) {
          return;
        }
        inner.removeAttribute('width');
        inner.removeAttribute('height');
        if (result.width && result.height) {
          inner.style.width = '100%';
          inner.style.aspectRatio = `${queryResult.width} / ${queryResult.height}`;
        }
        if (before) {
          el.append(before);
        }
        el.append(inner);
      }

      function fail(err) {
        apos.util.removeClass(el, 'apos-oembed-busy');
        apos.util.addClass(el, 'apos-oembed-invalid');
        // eslint-disable-next-line no-console
        console.error(err);
        if (err !== 'undefined') {
          el.innerHTML = '<p>Error loading video</p>';
        } else {
          el.innerHTML = '';
        }
      }
    }
  };
};
