import { newState, SIGNAL } from '../../src/util';
import { describe, test, expect } from '@jest/globals';

describe('verify newState()', () => {
    const cases = [
        {
            title: 'no signal',
            input: {
                state: BigInt(0b1110000000_0000000000_0000000000_0000000000_0000000101),
                signal: null
            },
            expected: BigInt(0b1100000000_0000000000_0000000000_0000000000_0000001010)
        },
        {
            title: 'a signal: ON',
            input: {
                state: BigInt(0b1110000000_0000000000_0000000000_0000000000_0000000101),
                signal: SIGNAL.ON
            },
            expected: BigInt(0b1100000000_0000000000_0000000000_0000000000_0000001011)
        },
        {
            title: 'a signal: OFF',
            input: {
                state: BigInt(0b1110000000_0000001000_0000000000_0000000000_0000000101),
                signal: SIGNAL.OFF
            },
            expected: BigInt(0b1100000000_0000010000_0000000000_0000000000_0000001010)
        }
    ];
    test.each(cases)('$title', ({input, expected}) => {
        expect(newState(input.state, input.signal)).toEqual(expected);
    });

    test('verify a chain of calls', () => {
        let state: bigint = BigInt(0);
        console.log(state.toString(2));

        // 1
        state = newState(state, SIGNAL.OFF);
        console.log(state.toString(2));

        // 2    
        state = newState(state, SIGNAL.ON);
        console.log(state.toString(2));

        // 3
        state = newState(state, SIGNAL.ON);
        console.log(state.toString(2));

        // 4
        state = newState(state, SIGNAL.OFF);
        console.log(state.toString(2));
        

        // 5
        state = newState(state, SIGNAL.ON);
        console.log(state.toString(2));
        
    });
});