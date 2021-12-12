'use strict'

import {CAPTURE_START, captureEvent, RECOGNIZE_START, recognizeEvent} from './action';
import {error} from './logger';
import {execSync} from 'child_process';
import {smartHome} from './emitter';
import {audio} from './config';

const record = event => {
    try {
        const command = ['arecord',
            audio.in !== 'default' ? `-D ${audio.in}` : '',
            '-f', 'S16_LE',
            '-r', '8000',
            '-d',
            event.duration,
            // debug -vv
            '-q',
            event.path
        ].join(' ');

        // async call to avoid blocking the audio device
        const stdout = execSync(command);

        smartHome.emit(RECOGNIZE_START, recognizeEvent(event.path, event.mode));
    } catch (e) {
        error('Capture ' + e);
        smartHome.emit(CAPTURE_START, captureEvent());
    }
};

exports.handler = event => {
    const path = `${audio.dir}/start-${new Date().toISOString()}.wav`;
    record({...event, path});
};
