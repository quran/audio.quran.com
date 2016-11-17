export const LOAD = '@@quran/download/LOAD';
export const LOAD_SUCCESS = '@@quran/download/LOAD_SUCCESS';
export const LOAD_FAIL = '@@quran/download/LOAD_FAIL';

export function load(id) {
  console.log('download ', id);
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/audio_files/download/${id}`),
    id
  };
}
