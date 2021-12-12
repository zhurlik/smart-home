'use strict'

import {exec} from 'child_process';
import {logger} from './config';

/**
 * sudo mkdir /var/log/smart-home
 * /etc/logrotate.d/smart-home
 * /etc/rsyslog.d/10-smart-home.conf
 */
const log = (msg) => {
    const appName = 'smart-home';
    const logger = '/usr/bin/logger';
    const command = [logger, '-i', '-s', '-t', appName, `"${msg}"`].join(' ');

    // async call
    exec(command);
};

// mapping
const getLogger = () => {
    return {
        syslog: {
            log,
            info: log,
            debug: log,
            warn: log,
            error: log
        },
        console
    }[logger.use];
};

/**
 *   5       4       3     2       1      0
 * trace > debug > info > warn > error > fatal
 */
const LEVELS = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'];
const configuredLevel = LEVELS.indexOf(logger.level || 'info');
const isEnabled = l => {
    const index = LEVELS.indexOf(l);
    return configuredLevel >= index;
}

exports.log = msg => {
    if (isEnabled('info')) {
        getLogger().log(msg);
    }
};

exports.info = msg => {
    if (isEnabled('info')) {
        getLogger().info(msg);
    }
};

exports.debug = msg => {
    if (isEnabled('debug') || isEnabled('trace')) {
        getLogger().debug(msg);
    }
};

exports.error = msg => {
    if (isEnabled('error') || isEnabled('fatal')) {
        getLogger().error(msg);
    }
};

exports.warn = msg => {
    if (isEnabled('warn')) {
        getLogger().warn(msg);
    }
};
