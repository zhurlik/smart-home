const Stomp = require('stompjs');

/**
 * A simple client for sending/reading MQTT messages via STOMP protocol.
 *
 * @type {RabbitMqClient}
 */
module.exports = class RabbitMqClient {
    constructor (endpoint = process.env.RABBITMQ_STOMP_ENDPOINT) {
        console.log(`RabbitMQ STOMP endpoint: ${endpoint}`);
        //ws://ip_address:15674/ws
        this.client = Stomp.client(endpoint);
    }

    connect() {
        let on_connect = function (x) {
            let id = this.client.subscribe("/topic/test", function (d) {
                console.log('>>' + d);
            });
        };

        let on_error = function () {
            console.log('>> Error');
        };

        this.client.connect('smart-home', 'smart-home', on_connect, on_error, '/');
    }
};