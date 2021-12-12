'use strict'

import {config} from 'dotenv';

const path = process.env.NODE_ENV ? `./.env.${process.env.NODE_ENV}` : './.env';
config({path});

// Audio device
exports.audio = {
    in: process.env['audio.device.in'] || 'default',
    dir: process.env['audio.dir'] || '/tmp'
};

exports.command = {
    start: {
        sec: process.env['capture.start.sec'] || 1,
        words: process.env['capture.start.words'] || ['окей', 'кей', 'дом', 'том', 'кейном', 'кейт', 'дон']
    }
}

// Vosk WebSocket server
exports.vosk = {
    server: process.env['vosk.server'] || 'ws://localhost:2700'
};

// Logging
exports.logger = {
    use: process.env['logger.use'] || 'console', // syslog|console
    level: process.env['logger.level'] || 'info' // trace > debug > info > warn > error > fatal
};
