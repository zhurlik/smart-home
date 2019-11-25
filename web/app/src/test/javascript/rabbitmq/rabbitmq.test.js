const currentEnv = process.env;
process.env = {
    RABBITMQ_STOMP_ENDPOINT: 'test-endpoint',
    RABBITMQ_USER: 'test-user',
    RABBITMQ_PASSWORD: 'test-password'
};

jest.mock('stompjs');

var testClient = require('../../../main/javascript/rabbitmq');

test('init RabbitMQ client', () => {
    expect.assertions(6);
});