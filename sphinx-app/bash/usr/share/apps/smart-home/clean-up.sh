#!/bin/bash

# delete unneeded files
count_of_undeleted=$(find $NFS_FOLDER -name 'start-signal-*.wav' | wc -l)
echo "Count of audio files that can be deleted: $count_of_undeleted"

if [ $count_of_undeleted -gt 20 ]; then
    echo "Going to clean-up"
    find $NFS_FOLDER -name 'start-signal-*.wav'
    find $NFS_FOLDER -name 'start-signal-*.wav' -exec rm -f {} \;
fi
