'use strict'

import {debug, error} from './logger';
import fs from 'fs';

exports.handler = (event) => {
    if (event.path) {
        fs.unlink(event.path, (err) => {
            if (err) {
                error(`Can not delete: ${event.path} \n${err}`);
                return
            }
            //file removed
            debug(`${event.path} was deleted`);
        });
    }
};