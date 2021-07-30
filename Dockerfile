FROM node:16.5

ENV API_URL http://localhost:8080
ENV USE_LOCAL_ASSETS true
ENV NODE_ENV production
ENV PORT 8000
ENV APIPORT 3000

RUN apt-get -y update && apt-get -y install supervisor ssh rsync

# logrotate
RUN apt-get -y install logrotate
COPY docker/supervisord.conf /etc/supervisor/supervisord.conf
COPY docker/pm2.logrotate.conf /etc/logrotate.d/pm2
RUN cp /etc/cron.daily/logrotate /etc/cron.hourly

# cache npm install when package.json hasn't changed
WORKDIR /tmp
ADD package.json package.json
RUN npm install
RUN npm install -g pm2

RUN mkdir /quranicaudio
RUN cp -a /tmp/node_modules /quranicaudio

WORKDIR /quranicaudio
ADD . /quranicaudio/
RUN npm run build

EXPOSE 8000
CMD ["supervisord", "--nodaemon", "-c", "/etc/supervisor/supervisord.conf"]
