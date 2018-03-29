import { Router } from 'express';

import models from '../models';
import request from 'request';
import archiver from 'archiver';

const routerInit = Router;
const router = routerInit();

router.get('/', (req, res) => {
  return models.qari.all().then(qaris => res.send(qaris));
});

router.get('/audio_files', (req, res) => {
  return models.qari
    .all({ include: [models.audioFile] })
    .then(qaris => res.send(qaris));
});

router.get('/:id', (req, res) => {
  return models.qari.findById(req.params.id).then(qari => res.send(qari));
});

router.get('/:id/audio_files', (req, res) => {
  models.qari.findById(req.params.id).then(qari => {
    qari.getAudioFiles({ order: 'surah_id' }).then(files => res.send(files));
  });
});

router.get('/:id/audio_files/:type', (req, res) => {
  models.qari.findById(req.params.id).then(qari => {
    qari
      .getAudioFiles({
        order: 'surah_id',
        where: { extension: req.params.type }
      })
      .then(files => res.send(files));
  });
});

router.get('/related/:id', (req, res) => {
  models.related
    .findAll({ where: { qari: req.params.id } })
    .then(related => res.send(related));
});

router.get('/:id/download', (req, res) => {
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });
  const header = {
    'Content-Type': 'application/x-zip',
    Pragma: 'public',
    Expires: '0',
    'Cache-Control': 'private, must-revalidate, post-check=0, pre-check=0',
    'Content-disposition': `attachment; filename=\"complete_quran.zip\"`,
    'Transfer-Encoding': 'chunked',
    'Content-Transfer-Encoding': 'binary'
  };

  archive
    .on('warning', err => {
      if (err.code === 'ENOENT') {
        console.log(err);
      } else {
        throw err;
      }
    })
    .on('error', err => {
      throw err;
    })
    .on('finish', () => res.send());

  // source https://stackoverflow.com/a/23501362/4764543
  res.writeHead(200, header);
  archive.store = true;

  archive.pipe(res);

  const qariId = req.params.id;
  models.qari
    .findById(qariId, {
      include: [
        {
          model: models.audioFile,
          where: { extension: 'mp3' },
          attributes: ['file_name']
        }
      ]
    })
    .then(qari => {
      const qariPath = qari.relative_path;
      qari.audioFiles.forEach(audioFile => {
        const fileName = audioFile.file_name;
        archive.append(
          request.get(
            `http://download.quranicaudio.com/quran/${qariPath}${fileName}`
          ),
          { name: 'Surah_${fileName}' }
        );
      });
      archive.append(`Name: ${qari.name}\n Arabic Name: ${qari.arabic_name}`, {
        name: 'qari_name.txt'
      });
      console.log(`Complete download of qari ${qari.name}`);
      console.log(archive.pointer() + ' total bytes');
      archive.finalize();
    });
});

export default router;
