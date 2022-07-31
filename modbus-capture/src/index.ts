import { emitter } from "./emitter";
import { READ_MODBUS } from "./modbus";
import { CONNECT_TO_REDIS } from "./store";

const main = async () => {
    // connect to redis server
    emitter.emit(CONNECT_TO_REDIS);

    // read rs-485 via usb
    emitter.emit(READ_MODBUS);
};

// a start point
main();