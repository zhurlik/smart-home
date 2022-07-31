import {close, CONNECT_TO_REDIS, get, set} from '../../src/store';
import { emitter } from '../../src/emitter';
import { describe, test, expect, afterAll, beforeAll } from '@jest/globals';

describe('Get/Set a key from/to redis', () => {
    beforeAll(() => {
        emitter.emit(CONNECT_TO_REDIS);
    });

    afterAll(() => {
        close();
    });

    test('get: null', async () => {
        expect(await get('test-key')).toEqual(null);
    });

    test('get: hello',async () => {
        set('test', 'hello');
        expect(await get('test')).toEqual('hello');
    });
});