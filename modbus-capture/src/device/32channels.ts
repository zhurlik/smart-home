import { emitter } from '../emitter';
import { set, get } from '../store';
import { newState, SIGNAL } from '../util';

export const READ_32_CHANNELS = 'READ_32_CHANNELS';

const SUPPORTED_DEVICES = [7];

/**
 * {0|1} 32 numbers[]
 */
emitter.on(READ_32_CHANNELS, (data: Array<number>) => {
    //console.debug(`32 channels: ${data}`);

    data.forEach(async (value: number, index: number) => {
        if (!SUPPORTED_DEVICES.includes(index)) {
            return;
        }

        // read device state in redis and make a new
        const deviceId: string = `device.${index}`;
        const previous: bigint = BigInt(await get(`${deviceId}.signals`) || 0);
        const signal: SIGNAL = (value === 1) ? SIGNAL.ON : SIGNAL.OFF
        const updated = newState(previous, signal);

        // store in redis
        set(`${deviceId}.signals`, updated.toString());
        console.log(`State: ${deviceId} = ${updated.toString(2)}`);
    });
});
