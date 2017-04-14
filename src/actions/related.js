import { arrayOf } from 'normalizr';
import { relatedSchema } from 'utils/schemas';

export const LOAD = '@@quran/related/LOAD';
export const LOAD_SUCCESS = '@@quran/related/LOAD_SUCCESS';
export const LOAD_FAIL = '@@quran/related/LOAD_FAIL';

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(relatedSchema),
    promise: client => client.get(`/qaris/related/${id}`),
    id
  };
}
