#!/bin/bash
# sudo service nginx status
sudo nginx -t
sudo ps aux | grep gunicorn
sudo pg_ctlcluster 14 main status