#!/bin/bash
echo "NGINX status:"
service nginx status
nginx -t
echo "GUnicorn status:"
ps aux | grep gunicorn
echo "PostgreSQL status:"
pg_ctlcluster 15 main status