/**
 * 1 second = 1000ms = 10 * 100ms to store the signals {1|0} during 1 second we need 10 bits.
 * For 5 secodns it requires 50 bits. 
 */
const MAX_BITS: number = 50;

/**
 * 100ms
 */
const RATE: number = 100;

export enum SIGNAL {
    ON,
    OFF
}

/**
 * This method using bitwise operations and having incoming signal {0|1} makes a new state.
 * 
 * Note: the state contains {MAX_BITS} bits (5 seconds) 
 * 
 * For exapmle:
 *  - signal: 0, previous state: 1101...01 -> new state: 101...010 
 *  - signal: 1, previous state: 1101...01 -> new state: 101...011
 * 
 * @param previousState current state
 * @param signal {ON|OFF}
 * @returns new state
 */
 export function newState(previousState: bigint, signal: SIGNAL = SIGNAL.OFF): bigint {

    // unset 50th bit: n & ~(1 << (k-1))
    let res = previousState & ~(1n << BigInt(MAX_BITS-1));
    
    // add 0 at the right
    res = res << 1n;

    // set 0th bit
    if (signal === SIGNAL.ON) {
        // (1 << k) | n
        res = 1n | res;
    }

    return res;
 }
