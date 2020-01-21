const rabbitMqClient = require('../rabbitmq/stomp');
const HEADERS = {"content-type": "text/plain"};
const TOPIC = process.env.RABBITMQ_TOPIC_LIGHT;

handler = (data) => {
    console.log(`>> Lights: ${data.body}`);
};

// todo: headers ?
rabbitMqClient.subscribe(TOPIC, handler);

/**
 * A wrapper for sending.
 *
 * @param msg
 */
send = (msg) => {
    rabbitMqClient.send(TOPIC, HEADERS, JSON.stringify(msg));
};

exports.to = (msg) => {
    send(msg);
};