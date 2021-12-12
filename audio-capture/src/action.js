'use strict'

import {command} from './config';

exports.START = 'start';

// capture
const captureType = 'capture'
exports.CAPTURE = captureType;
exports.CAPTURE_START = 'capture:start';
exports.CAPTURE_SET_DURATION = 'capture:set duration';
/**
 *
 * @param duration 1|5 seconds
 * @returns {{duration: number, mode: string, type: string}}
 */
exports.captureEvent = (duration = command.start.sec) => ({
    type: captureType,
    duration,
    mode: duration === command.start.sec ? 'begin' : 'command'
});

// recognize
const recognizeType = 'recognize'
exports.RECOGNIZE = recognizeType;
exports.RECOGNIZE_START = 'recognize:start';
exports.recognizeEvent = (path, mode = 'begin') => ({
    type: recognizeType,
    path,
    mode
});

// cleanup
const cleanupType = 'cleanup'
exports.CLEANUP = cleanupType;
exports.DELETE_FILE = 'delete:file';
exports.cleanupEvent = path => ({
    type: cleanupType,
    path
});


// speaker
const speakerType = 'speaker'
exports.SPEAKER = speakerType;
exports.SPEAKER_START = 'speaker:start';
exports.speakerEvent = (text, mode = 'begin') => ({
    type: speakerType,
    text,
    mode
});
