import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import morgan from 'morgan';

import routes from './routes';

const app = express();

app.use(
  session({
    secret: 'react and redux rule!!!!',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  })
);
app.use(bodyParser.json());
app.use(morgan('dev'));

routes(app);

if (config.apiPort) {
  app.listen(config.apiPort, err => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info(
      '==> 💻  Send requests to http://%s:%s',
      config.apiHost,
      config.apiPort
    );
  });
} else {
  console.error(
    '==>     ERROR: No APIPORT environment variable has been specified'
  );
}
