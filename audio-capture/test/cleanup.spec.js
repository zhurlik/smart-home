'use strict'

import fs from 'fs';

jest.mock('fs');

import {handler} from '../src/cleanup';

describe('Cleanup files', () => {
    test('Import cleanup module', () => {
        expect(typeof handler).toBe('function');
    });

    test('del file', () => {
        handler({
            path: 'test file'
        });

        expect(fs.unlink.mock.calls[0][0]).toBe('test file');
    });
});