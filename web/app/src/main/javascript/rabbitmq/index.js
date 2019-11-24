const Stomp = require('stompjs');

// See .env file
const ENDPOINT = process.env.RABBITMQ_STOMP_ENDPOINT;
const USER = process.env.RABBITMQ_USER;
const PASSWORD = process.env.RABBITMQ_PASSWORD;

const client = Stomp.client(ENDPOINT);
// note: that's async call
client.connect(USER, PASSWORD, (x) => {
    console.log(`Connected to RabbitMQ STOMP endpoint: ${ENDPOINT}`);
}, () => console.error(`There is a problem with: ${ENDPOINT}`), '/');

/**
 * The client should be connected to server.
 *
 * @param call either send or subscribe
 */
suspendedCall = call => {
    let attempt;
    new Promise(resolve => {
        attempt = setInterval(() => {
            if (client.connected) {
                resolve();
            }
        }, 1000);
    }).then(value => {
        clearInterval(attempt);
        // recall
        call();
    });
};

onMessage = (data) => {
    console.log('>> ' + data.body);
};

/**
 * A simple sender.
 *
 * TODO: make more flexible
 *
 * @param msg
 */
module.exports.send = (msg) => {
    let send = () => {
        client.send('/topic/floor.1.light.1', {"content-type": "text/plain"}, msg);
    };

    client.connected ? send() : suspendedCall(send);
};

/**
 * A simple subscribe method with hardcoded topic.
 * TODO: make more flexible
 */
module.exports.subscribe = () => {
    let subscribe = () => {
        client.subscribe('/topic/floor.1.light.1', onMessage);
    };

    client.connected ? subscribe() : suspendedCall(subscribe);
};
