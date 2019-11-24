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

/**
 * For handling all messages too.
 *
 * @param callback a custom handler
 */
onAll = (callback) => {
    return (data) => {
        console.log('>> Incoming:' + data);
        callback(data);
    };
};

module.exports.send = (destination, headers, body) => {
    let call = () => {
        client.send(destination, headers, body);
    };

    client.connected ? call() : suspendedCall(call);
};

module.exports.subscribe = (destination, callback, headers = {}) => {
    let call = () => {
        client.subscribe(destination, onAll(callback), headers);
    };

    client.connected ? call() : suspendedCall(call);
};
