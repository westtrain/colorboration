#!/bin/bash
cd /home/ubuntu/colorboration/server
authbind --deep pm2 start app.js
