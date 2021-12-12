'use strict';

import {audio, logger, vosk} from '../src/config';

describe('Configuration and settings', () => {
    test('logger', () => {
        expect(logger.use).toBe('console');
        expect(logger.level).toBe('debug');
    });

    test('vosk', () => {
        expect(vosk.server).toBe('ws://localhost:2700');
    });

    test('adio', () => {
        expect(audio.dir).toBe('/tmp');
        expect(audio.in).toBe('default');
    });
});