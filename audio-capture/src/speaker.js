'use strict'

import {debug, error} from './logger';
import {smartHome} from './emitter';
import {execSync} from 'child_process';
import {CAPTURE_START, captureEvent} from './action';

const requestCommand = event => {
    try {
        execSync(`echo "слушаю команду" | festival --language russian --tts`);
        debug('festival has been invoked');
        smartHome.emit(CAPTURE_START, captureEvent(5));
    } catch (e) {
        error(`A problem with festival: ${e}`);
        smartHome.emit(CAPTURE_START, captureEvent());
    }
};

const confirmCommand = event => {
    try {
        execSync(`echo "вы сказали ${event.text}" | festival --language russian --tts`);
        debug('festival has been invoked');
    } catch (e) {
        error(`A problem with festival: ${e}`);
    }
    smartHome.emit(CAPTURE_START, captureEvent());
};

exports.handler = event => {
    switch(event.mode) {
        case 'begin': return requestCommand(event);
        case 'command': return confirmCommand(event)
        default: smartHome.emit(CAPTURE_START, captureEvent());
    }
};
