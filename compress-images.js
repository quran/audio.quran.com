const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');


imagemin(['./static/images/background/*.jpeg'], './static/images/background/compressed', {
  plugins: [
    imageminJpegRecompress({quality: 'low', min: 1, max: 10}),
    // imageminMozjpeg(),
  ]
}).then(files => {
  console.log('Done!', files);
}).catch(err => console.log(err));
