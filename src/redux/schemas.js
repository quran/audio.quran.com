import { Schema } from 'normalizr';

const surahsSchema = new Schema('surahs');
const qarisSchema = new Schema('qaris');

const schemas = {
  surahsSchema,
  qarisSchema
};

export default schemas;
