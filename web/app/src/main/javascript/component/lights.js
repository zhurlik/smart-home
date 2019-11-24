const rabbitMqClient = require('../rabbitmq');

rabbitMqClient.subscribe();

/**
 * TODO: make more flexible
 */
exports.on = function () {
    console.log('Turn on a light!!!');
    rabbitMqClient.send('{name: "1"}');
    rabbitMqClient.send('{name: "2"}');
};