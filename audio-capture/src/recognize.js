'use strict'

import {debug, error, log} from './logger';
import {vosk, command} from './config';
import websocket from 'ws';
import fs from 'fs';
import {smartHome} from './emitter';
import {CAPTURE_START, captureEvent, cleanupEvent, DELETE_FILE, SPEAKER_START, speakerEvent} from './action';
const END = '{"eof" : 1}';

// окей дом
const isStart = txt => {
    return txt.split(' ')
        .map(w => command.start.words.includes(w))
        .filter(b => b === true).length > 0;
};

const connect = (event, sender = () => {
}) => {
    const ws = new websocket(vosk.server);
    let extracted = false;

    ws.on('open', () => {
        debug(`Connected: ${ws.url}`);
        sender(ws);
    });

    ws.on('message', data => {
        if (data) {
            const obj = JSON.parse(data.toString('utf-8'));
            //debug(JSON.stringify(obj));
            const txt = obj.text || '';
            if (isStart(txt) && event.mode === 'begin') {
                debug(`Start signal: ${txt}`);
                extracted = true;
                smartHome.emit(SPEAKER_START, speakerEvent(txt));
                ws.close(1000, 'A client wants to close a connection');
                return;
            }

            if (event.mode === 'command' && txt !== '') {
                debug(`Text: ${txt}`);
                extracted = true;
                smartHome.emit(SPEAKER_START, speakerEvent(txt, event.mode));
                ws.close(1000, 'A client wants to close a connection');
                return;
            }
        }
    });

    ws.on('error', e => {
        error(`Vosk server Error: ${JSON.stringify(e)}`);
        smartHome.emit(CAPTURE_START, captureEvent());
    });

    ws.on('close', () => {
        debug('Vosk Server has closed websocket connection');
        if (!extracted) {
            smartHome.emit(CAPTURE_START, captureEvent());
        }
    });
};

exports.handler = event => {
    if (event.path) {
        connect(event, ws => {
            fs.readFile(event.path, (err, data) => {
                if (err) {
                    error(`A problem with reading: ${event.path} ${err}`)
                    ws.close(1000, 'There is a problem with a wav file');
                    smartHome.emit(DELETE_FILE, cleanupEvent(event.path));
                    return;
                }

                debug('Sending audio chunk...');
                ws.send(data, () => {
                    debug('Sending the end signal...');
                    ws.send(END, () => {
                        smartHome.emit(DELETE_FILE, cleanupEvent(event.path));
                    });
                });
            });
        });
    }
};
