#!/bin/sh
ssh -p 50739 jenkins@test-server.innovationvillage.co.ug <<EOF
 cd /var/www/my-village
 git checkout develop
 git pull
 yarn install
 yarn run build
 exit 
EOF
