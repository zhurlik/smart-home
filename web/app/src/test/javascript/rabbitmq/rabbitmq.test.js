const currentEnv = process.env;
process.env = {
    RABBITMQ_STOMP_ENDPOINT: 'test-endpoint',
    RABBITMQ_USER: 'test-user',
    RABBITMQ_PASSWORD: 'test-password'
};

afterEach(() => {
    jest.resetModules();
});

test('init RabbitMQ client', () => {
    jest.mock('stompjs', () => {
        return {
            client: (url) => {
                expect(url).toEqual('test-endpoint');
                return {
                    connect: (user, password, connectCallback, errorCallback, root) => {
                        expect(user).toEqual('test-user');
                        expect(password).toEqual('test-password');
                        expect(connectCallback.toString()).toEqual('x => {\n' +
                            '  console.log(`Connected to RabbitMQ STOMP endpoint: ${ENDPOINT}`);\n' +
                            '}');
                        expect(errorCallback.toString()).toEqual('() => console.error(`There is a problem with: ${ENDPOINT}`)');
                        expect(root).toEqual('/');
                    }
                }
            }
        }
    });
    let testClient = require('../../../main/javascript/rabbitmq/stomp');
    expect(testClient).toBeDefined();
    expect.assertions(7);
});

test('sending when there is no connection yet', () => {
    jest.useFakeTimers();
    jest.mock('stompjs', () => {
        return {
            client: (url) => {
                return {
                    connect: () => {
                    },
                    connected: false
                }
            }
        }
    });
    let testClient = require('../../../main/javascript/rabbitmq/stomp');

    testClient.send('/topic/test', {header1: 'test-header'}, {test: 'body'});
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

test('sending when there is connection', () => {
    jest.mock('stompjs', () => {
        return {
            client: (url) => {
                return {
                    connect: (user, password, connectCallback, errorCallback, root) => {
                    },
                    connected: true,
                    send: (destination, headers, body) => {
                        expect(destination).toEqual('/topic/test');
                        expect(headers).toEqual({header1: 'test-header'});
                        expect(body).toEqual({test: 'body'});
                    }
                }
            }
        }
    });
    let testClient = require('../../../main/javascript/rabbitmq/stomp');
    testClient.send('/topic/test', {header1: 'test-header'}, {test: 'body'});
    expect.assertions(3);
});