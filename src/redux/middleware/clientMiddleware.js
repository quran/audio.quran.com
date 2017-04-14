import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';

export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, schema, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({ ...rest, type: REQUEST });

      const actionPromise = promise(client);
      actionPromise
        .then(
          result => {
            let camelizedJson = camelizeKeys(result);

            if (schema) {
              camelizedJson = normalize(camelizedJson, schema);
            }

            return next({ ...rest, result: camelizedJson, type: SUCCESS });
          },
          error => next({ ...rest, error, type: FAILURE })
        )
        .catch(error => {
          console.error('MIDDLEWARE ERROR:', error);
          next({ ...rest, error, type: FAILURE });
        });

      return actionPromise;
    };
  };
}
