import { arrayOf } from 'normalizr';
import { sectionsSchema } from 'utils/schemas';

export const LOAD = '@@quran/sections/LOAD';
export const LOAD_SUCCESS = '@@quran/sections/LOAD_SUCCESS';
export const LOAD_FAIL = '@@quran/sections/LOAD_FAIL';

export function loadAll() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(sectionsSchema),
    promise: client => client.get('/sections')
  };
}
