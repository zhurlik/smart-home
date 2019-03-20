#!/bin/bash

if [ ! -d "$NFS_FOLDER" ]; then
  echo "ERROR: $NFS_FOLDER doesn't exist"
  exit 1 # terminate and indicate error
fi

echo "Going to capture audio per $WAITING"

function capture_start_signal() {
    while [ true ]; do
        for i in {1..5}
        do
            arecord -f S16_LE -r 8000 -d $WAITING "$NFS_FOLDER/start-signal-$(date +%T).wav"
        done;

        # delete unneeded files
        count_of_undeleted=$(find $NFS_FOLDER -name 'start-signal-*.wav' | wc -l)
        if [ $count_of_undeleted -gt 10 ]; then
            echo "Going to clean-up"
            find $NFS_FOLDER -name 'start-signal-*.wav'
            find $NFS_FOLDER -name 'start-signal-*.wav' -exec rm -f {} \;
        fi
    done
}
export -f capture_start_signal

capture_start_signal