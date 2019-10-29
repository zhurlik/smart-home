const Stomp = require('stompjs');
//ws://ip_address:15674/ws
const client = Stomp.client(process.env.RABBITMQ_STOMP_ENDPOINT);

console.log(`RabbitMQ STOMP endpoint: ${process.env.RABBITMQ_STOMP_ENDPOINT}`);

let on_connect = function (x) {
    id = client.subscribe("/topic/test", function (d) {
        console.log('>>' + d);
    });
};

let on_error = function () {
    console.log('>> Error');
};

client.connect('smart-home', 'smart-home', on_connect, on_error, '/');


document.write("Smart Home");