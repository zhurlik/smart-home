#!/bin/bash

if [ ! -d "$NFS_FOLDER" ]; then
  echo "ERROR: $NFS_FOLDER doesn't exist"
  exit 1 # terminate and indicate error
fi

echo "Going to capture audio per $WAITING"

while [ true ]; do
    for i in {1..5}
    do
        arecord -f S16_LE -r 8000 -d $WAITING "$NFS_FOLDER/start-signal-$(date +%T).wav"
    done;
done
