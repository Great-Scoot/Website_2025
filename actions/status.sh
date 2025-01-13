#!/bin/bash
service nginx status
nginx -t
ps aux | grep gunicorn
pg_ctlcluster 14 main status