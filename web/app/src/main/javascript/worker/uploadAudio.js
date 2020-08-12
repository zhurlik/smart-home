import rabbitMqClient from "../rabbitmq/stomp";

rabbitMqClient.subscribe('/topic/smart-home', (data) => {
    console.log('>> Rabbitmq Message: ' + data);

});

onmessage = (msg) => {
    console.log('Audio capture:' + msg.data);
}