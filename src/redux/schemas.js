import { Schema } from 'normalizr';

const surahsSchema = new Schema('surahs');
const qarisSchema = new Schema('qaris');
const sectionsSchema = new Schema('sections');

const schemas = {
  surahsSchema,
  qarisSchema,
  sectionsSchema
};

export default schemas;
