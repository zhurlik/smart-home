#!/bin/bash

if [ ! -d "$NFS_FOLDER" ]; then
  echo "ERROR: $NFS_FOLDER doesn't exist"
  exit 1 # terminate and indicate error
fi

echo "Going to capture audio per $WAITING"
arecord -f S16_LE -r 8000 -d $WAITING "$NFS_FOLDER/start-signal-$(date +%T).wav"
