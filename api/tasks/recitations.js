import models from '../models';


models.qari.findOne({where: {id: 54}, include: [ models.audioFile ] }).then(qari => {
  return qari.audioFiles.forEach(file => {
    file.recitation_id = 5;
    return file.save();
    // console.log(file.recitation_id);
  });
});
