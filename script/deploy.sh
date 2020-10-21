#!/bin/sh
ssh -p 50739 jenkins@test-server.innovationvillage.co.ug <<EOF
 cd /var/www/myvillage-ui
 git checkout develop
 git pull
 yarn install
 yarn run build
 exit
EOF
