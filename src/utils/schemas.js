import { Schema } from 'normalizr';

const surahsSchema = new Schema('surahs');
const qarisSchema = new Schema('qaris');
const sectionsSchema = new Schema('sections');
const filesSchema = new Schema('files', { idAttribute: 'surahId' });

const schemas = {
  surahsSchema,
  qarisSchema,
  sectionsSchema,
  filesSchema
};

export default schemas;
