'use strict'

import child_process from 'child_process';

jest.mock('child_process');
jest.mock('../src/config', () => {
    const originalModule = jest.requireActual('../src/config');
    return {
        __esModule: true,
        ...originalModule,
        logger: {
            use: 'syslog',
            level: 'warn'
        },
    };
});

import {debug, error, info, log, warn} from '../src/logger';

describe('Smart Home logger', () => {
    test('Create instance', () => {
        expect(log).not.toBeNull();
        expect(typeof log).toBe('function');
        expect(typeof info).toBe('function')
        expect(typeof debug).toBe('function')
        expect(typeof error).toBe('function')
        expect(typeof warn).toBe('function')
    });

    test('method log()', () => {
        log('Test message');
        expect(child_process.exec).not.toHaveBeenCalled();
    });

    test('method info()', () => {
        info('info message');
        expect(child_process.exec).not.toHaveBeenCalled();
    });

    test('method debug()', () => {
        debug('debug message');
        expect(child_process.exec).not.toHaveBeenCalled();
    });

    test('method warn()', () => {
        warn('warning message');
        expect(child_process.exec).toHaveBeenCalledWith('/usr/bin/logger -i -s -t smart-home "warning message"');
    });

    test('method error()', () => {
        error('error message');
        expect(child_process.exec).toHaveBeenCalledWith('/usr/bin/logger -i -s -t smart-home "error message"');
    });
});
