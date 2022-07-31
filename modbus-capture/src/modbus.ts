import ModbusRTU from 'modbus-serial';
import { READ_32_CHANNELS } from './device/32channels';
import { emitter } from './emitter';

// create an empty modbus client
const client = new ModbusRTU();

// slave ID (device address)
client.setID(1);

const connected = () => {
    console.log('>> Has been connected...');
    // reads the values [128...128+32] every 100ms
    setInterval(() => {
        client.readHoldingRegisters(128, 32).then(data => {
            if(data.data) {
                emitter.emit(READ_32_CHANNELS, data.data);
            }
        });
    }, 100);
};

export const READ_MODBUS = 'READ_MODBUS';
emitter.on(READ_MODBUS, () => {
    // open connection to a serial port
    client.connectRTUBuffered("/dev/ttyUSB0", { baudRate: 9600 }, connected);
});
