'use strict'

import {
    CAPTURE,
    CAPTURE_START,
    captureEvent,
    CLEANUP,
    DELETE_FILE,
    RECOGNIZE,
    RECOGNIZE_START,
    SPEAKER,
    SPEAKER_START,
    START
} from "./action";
import EventEmitter from 'events';
import capture from './capture';
import recognize from './recognize';
import cleanup from './cleanup';
import speaker from './speaker';
import {log} from './logger';

class SmartHomeEmitter extends EventEmitter {
}

const emitter = new SmartHomeEmitter();

// subscribe
emitter.on(CAPTURE_START, (event) => {
    if (event && event.type === CAPTURE) {
        capture.handler(event)
    }
});

emitter.on(RECOGNIZE_START, (event) => {
    if (event && event.type === RECOGNIZE) {
        recognize.handler(event);
    }
});

emitter.on(DELETE_FILE, (event) => {
    if (event && event.type === CLEANUP) {
        cleanup.handler(event);
    }
});

emitter.on(SPEAKER_START, (event) => {
    if (event && event.type === SPEAKER) {
        speaker.handler(event);
    }
});

emitter.once(START, () => {
    log('Starting smart-home capture...');
    emitter.emit(CAPTURE_START, captureEvent())
});

exports.smartHome = emitter;
