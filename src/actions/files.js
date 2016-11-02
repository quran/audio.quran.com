import { arrayOf } from 'normalizr';
import { filesSchema } from 'utils/schemas';

export const LOAD = '@@quran/files/LOAD';
export const LOAD_SUCCESS = '@@quran/files/LOAD_SUCCESS';
export const LOAD_FAIL = '@@quran/files/LOAD_FAIL';

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(filesSchema),
    promise: (client) => client.get(`/qaris/${id}/audio_files/mp3`),
    id
  };
}
