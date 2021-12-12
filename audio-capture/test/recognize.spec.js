'use strict';

import {
    CAPTURE_START,
    captureEvent,
    cleanupEvent,
    DELETE_FILE,
    recognizeEvent,
    SPEAKER_START,
    speakerEvent
} from '../src/action';
import {debug} from '../src/logger';
import {smartHome} from '../src/emitter';

jest.mock('../src/emitter');
jest.mock('../src/logger');

import {handler} from '../src/recognize';

const testDataDir = `${process.cwd()}/test/data`;

describe('Recognize module', () => {
    test('Import and create instance', () => {
        expect(typeof handler).toBe('function');
    });

    test('Handle event - okay home', async () => {
        // Given
        const path = `${testDataDir}/okay_home.wav`;

        // When
        await handler(recognizeEvent(path));

        // Then
        await new Promise((r) => setTimeout(r, 2500));
        expect(debug).toHaveBeenCalledTimes(5);
        expect(debug).toHaveBeenNthCalledWith(1, 'Connected: ws://localhost:2700');
        expect(debug).toHaveBeenNthCalledWith(2, 'Sending audio chunk...');
        expect(debug).toHaveBeenNthCalledWith(3, 'Sending the end signal...');
        expect(debug).toHaveBeenNthCalledWith(4, 'Start signal: кей дом');
        expect(debug).toHaveBeenNthCalledWith(5, 'Vosk Server has closed websocket connection');

        expect(smartHome.emit).toHaveBeenCalledTimes(2);
        expect(smartHome.emit).toHaveBeenNthCalledWith(1, DELETE_FILE, cleanupEvent(path));
        expect(smartHome.emit).toHaveBeenNthCalledWith(2, SPEAKER_START, speakerEvent('кей дом', 'begin'));

    }, 3000);

    test('Handle event - bad wav', async () => {
        // Given
        const path = `${testDataDir}/bad.wav`;

        // When
        await handler(recognizeEvent(path));

        // Then
        await new Promise((r) => setTimeout(r, 3000));
        expect(debug).toHaveBeenCalledTimes(4);
        expect(debug).toHaveBeenNthCalledWith(1, 'Connected: ws://localhost:2700');
        expect(debug).toHaveBeenNthCalledWith(2, 'Sending audio chunk...');
        expect(debug).toHaveBeenNthCalledWith(3, 'Sending the end signal...');
        expect(debug).toHaveBeenNthCalledWith(4, 'Vosk Server has closed websocket connection');

        expect(smartHome.emit).toHaveBeenCalledTimes(2);
        expect(smartHome.emit).toHaveBeenNthCalledWith(1, DELETE_FILE, cleanupEvent(path));
        expect(smartHome.emit).toHaveBeenNthCalledWith(2, CAPTURE_START, captureEvent());
    });

    test('Handle event - a command', async () => {
        // Given
        const path = `${testDataDir}/lights.wav`;

        // When
        await handler(recognizeEvent(path, 'command'));

        // Then
        await new Promise((r) => setTimeout(r, 3000));
        expect(debug).toHaveBeenCalledTimes(5);
        expect(debug).toHaveBeenNthCalledWith(1, 'Connected: ws://localhost:2700');
        expect(debug).toHaveBeenNthCalledWith(2, 'Sending audio chunk...');
        expect(debug).toHaveBeenNthCalledWith(3, 'Sending the end signal...');
        expect(debug).toHaveBeenNthCalledWith(4, 'Text: включи свет в зале');
        expect(debug).toHaveBeenNthCalledWith(5, 'Vosk Server has closed websocket connection');

        expect(smartHome.emit).toHaveBeenCalledTimes(2);
        expect(smartHome.emit).toHaveBeenNthCalledWith(1, DELETE_FILE, cleanupEvent(path));
        expect(smartHome.emit).toHaveBeenNthCalledWith(2, SPEAKER_START,
            speakerEvent('включи свет в зале', 'command'));
    });
});