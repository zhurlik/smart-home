const Stomp = require('stompjs');
const client = Stomp.client('ws://192.168.100.3:15674/ws');

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