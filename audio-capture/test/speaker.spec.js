'use strict';

import {CAPTURE_START, captureEvent, speakerEvent} from '../src/action';
import {execSync} from 'child_process';
import {smartHome} from '../src/emitter';
import {debug, error} from '../src/logger';

jest.mock('child_process');
jest.mock('../src/emitter');
jest.mock('../src/logger');

import {handler} from '../src/speaker';

describe('speaker', () => {
    test('Import and create', () => {
        expect(typeof handler).toBe('function');
    });

    test('handler start', () => {
        handler(speakerEvent('test'));

        expect(execSync).toHaveBeenCalledWith(`echo "слушаю команду" | festival --language russian --tts`);
        expect(debug).toHaveBeenCalledWith('festival has been invoked');
        expect(smartHome.emit).toHaveBeenCalledWith(CAPTURE_START, captureEvent(5));
    });

    test('handler start with error', () => {
        execSync.mockImplementation(() => {
            throw new Error('test error');
        });

        handler(speakerEvent('test'));

        expect(execSync).toHaveBeenCalledWith(`echo "слушаю команду" | festival --language russian --tts`);
        expect(error).toHaveBeenCalledWith('A problem with festival: Error: test error');
        expect(smartHome.emit).toHaveBeenCalledWith(CAPTURE_START, captureEvent());
    });
});
