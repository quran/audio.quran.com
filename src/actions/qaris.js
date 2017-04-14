import { arrayOf } from 'normalizr';
import { qarisSchema } from 'utils/schemas';
export const LOAD = '@@quran/qaris/LOAD';
export const LOAD_SUCCESS = '@@quran/qaris/LOAD_SUCCESS';
export const LOAD_FAIL = '@@quran/qaris/LOAD_FAIL';

export function loadAll() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(qarisSchema),
    promise: client => client.get(`/qaris`)
  };
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(qarisSchema),
    promise: client => client.get(`/qaris/${id}`)
  };
}
