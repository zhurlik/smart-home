#!/usr/bin/env bash

# interrupt recoding after # seconds
WAITING=5

# NFS folder where will be stored *.wav files
NFS_FOLDER=/srv/nfs4/audio
if [ ! -d "$NFS_FOLDER" ]; then
  echo "ERROR: $NFS_FOLDER doesn't exist"
  exit 1 # terminate and indicate error
fi

echo "Going to capture audio per $WAITING"
while [ true ]; do
    # recording 10 times
    for i in {1..10}
    do
        arecord -f S16_LE -r 8000 -d $WAITING "$NFS_FOLDER/start-signal-$(date +%T).wav"
    done;

    # delete unneeded files
    find -name 'start-signal-*.wav' -mtime -1 -exec rm -f {} \;
done