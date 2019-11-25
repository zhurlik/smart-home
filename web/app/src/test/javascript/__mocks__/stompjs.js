/**
 * A mock of the stompjs module.
 */
exports.client = (url) => {
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
};
