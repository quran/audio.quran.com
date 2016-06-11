import models from '../models';
import probe from 'node-ffprobe';

const createData = (files, index) => {
  const file = files[index];

  if (file.qari && (!file.format || !file.metadata)) {
    const url = `http://download.quranicaudio.com/quran/${file.qari.relative_path}${file.file_name}`;
    console.log(url);
    try{
      return probe(url, (err, data) => {
        file.metadata = data.metadata;
        file.format = data.format;
        file.save();

        createData(files, index + 1);
      });
    } catch(error) {
      console.warn(error);
    }
  }
}

models.audioFile.all({ where: {extension: 'mp3', metadata: null, format: null}, include: [models.qari] }).then(files => {
  return createData(files, 0);
});
