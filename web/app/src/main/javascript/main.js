const RabbitMqClient = require('./rabbitmq');
const rabbitMqClient = new RabbitMqClient();

rabbitMqClient.connect();

document.write("Smart Home");