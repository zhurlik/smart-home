import { describe, test, expect, afterAll, jest } from '@jest/globals';
import { EventEmitter } from 'events';
import { emitter } from '../../src/emitter';

describe('Verify internal emitter', () => {
    test('Check instance', () => {
        expect(emitter).toBeInstanceOf(EventEmitter);
        expect(emitter).not.toBeNull();
    });

    test('Check handling events', () => {
        // Given
        const mockFn = jest.fn();
        emitter.on('test event', mockFn);

        // When
        emitter.emit('test event', 'a', 'b');

        // Then
        expect(mockFn).toHaveBeenCalledWith('a', 'b');
    });
});