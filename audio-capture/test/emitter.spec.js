'use strict'

import {
    CAPTURE,
    CAPTURE_START,
    captureEvent, CLEANUP, cleanupEvent, DELETE_FILE,
    RECOGNIZE,
    RECOGNIZE_START,
    recognizeEvent,
    SPEAKER, SPEAKER_START,
    speakerEvent,
    START
} from '../src/action';
import each from 'jest-each';
import {log} from '../src/logger';
import capture from '../src/capture';
import recognize from '../src/recognize';
import cleanup from '../src/cleanup';
import speaker from '../src/speaker';
import {smartHome} from '../src/emitter';
import {command} from "../src/config";

jest.mock('../src/logger');
jest.mock('../src/capture');
jest.mock('../src/recognize');
jest.mock('../src/cleanup');
jest.mock('../src/speaker');

describe('Smart Home emitter', () => {
    test('Import smart home emitter', () => {
        expect(smartHome).not.toBeNull();
        expect(smartHome).not.toBeUndefined();

        // nothing should be invoked
        expect(log).not.toHaveBeenCalledWith('Starting smart-home capture...');
        expect(capture.handler).not.toHaveBeenCalled();
        expect(recognize.handler).not.toHaveBeenCalled();
        expect(cleanup.handler).not.toHaveBeenCalledWith();
        expect(speaker.handler).not.toHaveBeenCalledWith();
    });

    test('Smart Home events', () => {
        expect(smartHome.eventNames()).toEqual(
            [CAPTURE_START, RECOGNIZE_START, DELETE_FILE, SPEAKER_START, START]);
    });

    each([
        ['on start', START],
        ['on capture:start', CAPTURE_START],
        ['on recognize:start', RECOGNIZE_START],
        ['on speaker:start', SPEAKER_START],
        ['on delete:file', DELETE_FILE]
    ]).test('added listener: %s', (text, type) => {
        expect(smartHome.listeners(type).length).toBe(1);
        expect(typeof smartHome.listeners(type)[0]).toBe('function');
    });

    test('start main process', () => {
        smartHome.emit(START);
        expect(log).toHaveBeenCalledWith('Starting smart-home capture...');
        expect(capture.handler).toHaveBeenCalledWith({
            duration: command.start.sec,
            mode: 'begin',
            type: CAPTURE
        });
        expect(recognize.handler).not.toHaveBeenCalled();
        expect(cleanup.handler).not.toHaveBeenCalled();
        expect(speaker.handler).not.toHaveBeenCalled()
    });

    test('start capture process', () => {
        smartHome.emit(CAPTURE_START, captureEvent(5));
        expect(log).not.toHaveBeenCalled();
        expect(capture.handler).toHaveBeenCalledWith({
            duration: 5,
            mode: 'command',
            type: CAPTURE
        });
        expect(recognize.handler).not.toHaveBeenCalled();
        expect(cleanup.handler).not.toHaveBeenCalled();
        expect(speaker.handler).not.toHaveBeenCalled();

    });

    test('delete file process', () => {
        smartHome.emit(DELETE_FILE, cleanupEvent('test file'));
        expect(log).not.toHaveBeenCalled();
        expect(capture.handler).not.toHaveBeenCalled();
        expect(recognize.handler).not.toHaveBeenCalled();
        expect(speaker.handler).not.toHaveBeenCalled();
        expect(cleanup.handler).toHaveBeenCalledWith({
            path: 'test file',
            type: CLEANUP
        })
    });

    test('start recognize process', () => {
        smartHome.emit(RECOGNIZE_START, recognizeEvent('test file'));
        expect(log).not.toHaveBeenCalled();
        expect(capture.handler).not.toHaveBeenCalled();
        expect(cleanup.handler).not.toHaveBeenCalled();
        expect(speaker.handler).not.toHaveBeenCalled();
        expect(recognize.handler).toHaveBeenCalledWith({
            mode: 'begin',
            type: RECOGNIZE,
            path: 'test file'
        })
    });

    test('start speaker process', () => {
        smartHome.emit(SPEAKER_START, speakerEvent('I would like to say'));
        expect(log).not.toHaveBeenCalled();
        expect(capture.handler).not.toHaveBeenCalled();
        expect(cleanup.handler).not.toHaveBeenCalled();
        expect(speaker.handler).toHaveBeenCalledWith({
            mode: 'begin',
            type: SPEAKER,
            text: "I would like to say"
        });
        expect(recognize.handler).not.toHaveBeenCalled();
    });
});
