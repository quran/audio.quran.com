import config from '../config';
const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath;
}

export default class ApiClient {
  constructor() {
    methods.forEach(
      method =>
        (this[method] = async (path, { params, data } = {}) => {
          const options = {
            method: method.toUpperCase(),
            credentials: 'same-origin',
            body: data
          };

          if (data) {
            options.body = data;
          }

          if (params) {
            console.error('add support for querystrings');
          }
          const request = await fetch(formatUrl(path), options);

          if (!request.ok) {
            throw Error(request.statusText);
          }

          return request.json();
        })
    );
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}
