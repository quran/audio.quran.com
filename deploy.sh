cat qaudio.service | ssh ${DEPLOY_HOST} '
    mkdir -p /srv/apps/qaudio
    cat - > /srv/apps/qaudio.service
    sudo systemctl enable /srv/apps/qaudio.service
'
cp package.json pnpm-lock.yaml build
APP_NAME=qaudio
app_new_tmp_dir=${APP_NAME}-new-$(date +%s)
tar -C build --zstd -cf - . | ssh ${DEPLOY_HOST} "
    set -e
    FORCE_COLOR=1
    cd /srv/apps
    tar --zstd -xf - --one-top-level=${app_new_tmp_dir}
    mise x -- pnpm i --prod --dir ${app_new_tmp_dir}
    [ -d ${APP_NAME} ] && mv ${APP_NAME} ${APP_NAME}-old
    mv ${app_new_tmp_dir} ${APP_NAME}
    rm -rf ${APP_NAME}-old
    sudo systemctl restart ${APP_NAME}
"
