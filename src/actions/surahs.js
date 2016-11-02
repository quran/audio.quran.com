import { arrayOf } from 'normalizr';
import { surahsSchema } from 'utils/schemas';

export const LOAD = '@@quran/surahs/LOAD';
export const LOAD_SUCCESS = '@@quran/surahs/LOAD_SUCCESS';
export const LOAD_FAIL = '@@quran/surahs/LOAD_FAIL';


export function loadAll() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(surahsSchema),
    promise: (client) => client.get(`/surahs`)
  };
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(surahsSchema),
    promise: (client) => client.get(`/surahs/${id}`)
  };
}
