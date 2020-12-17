#!/bin/sh
ssh -p 50739 jenkins@prod-server.innovationvillage.co.ug <<EOF
 cd /var/www/my-village
 git checkout master
 git pull
 yarn install
 yarn run build
 exit 
EOF
