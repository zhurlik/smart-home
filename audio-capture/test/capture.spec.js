'use strict'

import {execSync} from 'child_process';
import {smartHome} from '../src/emitter';
import {error} from '../src/logger';

jest.mock('../src/emitter');
jest.mock('child_process');
jest.mock('../src/logger');

import {handler} from '../src/capture';
import {CAPTURE, CAPTURE_START, RECOGNIZE, RECOGNIZE_START} from "../src/action";
import {command} from '../src/config';

describe('Capture audio', () => {
    test('Import capture', () => {
        expect(typeof handler).toBe('function');
    });

    test('capture handler', () => {

        handler({duration: 3});

        expect(execSync).toBeCalled();
        // arecord  -f S16_LE -r 8000 -d 3 -q /tmp/start-2021-10-23T19:21:02.701Z.wav
        expect(execSync.mock.calls[0][0])
            .toMatch(/^arecord  -f S16_LE -r 8000 -d 3 -q \/tmp\/start-.*\.wav$/);
        const wavFile = execSync.mock.calls[0][0].split(' ').pop();
        expect(smartHome.emit).toHaveBeenCalledWith(RECOGNIZE_START, {
            mode: 'begin',
            type: RECOGNIZE,
            path: wavFile
        });
    });

    test('capture handler with a problem', () => {
        execSync.mockImplementation(() => {
            throw new Error('test error')
        });

        handler({duration: 5});

        expect(execSync).toBeCalled();
        expect(smartHome.emit).toHaveBeenCalledWith(CAPTURE_START, {
            type: CAPTURE,
            mode: 'begin',
            duration: command.start.sec
        });
        expect(error).toHaveBeenCalledWith('Capture Error: test error');
    });
});