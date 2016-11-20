import { Schema } from 'normalizr';

const surahsSchema = new Schema('surahs');
const qarisSchema = new Schema('qaris');
const sectionsSchema = new Schema('sections');
const relatedSchema = new Schema('related');
const filesSchema = new Schema('files', { idAttribute: 'surahId' });

const schemas = {
  surahsSchema,
  qarisSchema,
  sectionsSchema,
  filesSchema,
  relatedSchema
};

export default schemas;
