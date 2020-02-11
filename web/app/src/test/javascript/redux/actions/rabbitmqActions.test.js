import {
    receiveMqttMessage,
    selectLightMessage,
    sendMqttMessage
} from '../../../../main/javascript/redux/actions/rabbitmqActions'

describe('receiveMqttMessage()', () => {
    const blank = {
        "payload": {},
        "type": "INCOMING MQTT MESSAGE"
    };

    test('\'\'', () => {
        expect(receiveMqttMessage()).toEqual(blank);
    });

    test('null', () => {
        expect(receiveMqttMessage(null)).toEqual(blank);
    });

    test('{}', () => {
        expect(receiveMqttMessage({})).toEqual(blank);
    });
    test('{ nobody:  1234 }', () => {
        expect(receiveMqttMessage({nobody: 1234})).toEqual(blank);
    });

    test('{ body:  "test" }', () => {
        try {
            receiveMqttMessage({body: "test"})
        } catch (e) {
            expect(e.message).toBe('Unexpected token e in JSON at position 1');
        }
    });

    test('{ body:  "{"test": 123}" }', () => {
        expect(receiveMqttMessage({body: "{\"test\": 123}"})).toEqual({
            "payload": {
                "test": 123
            },
            "type": "INCOMING MQTT MESSAGE"
        });
    });
});

describe('sendMqttMessage()', () => {
    test('is function', () => {
        expect(sendMqttMessage('test')).toBeInstanceOf(Function);
    });

    test('check calls', () => {
        // Given
        const dispatch = jest.fn();
        const getState = jest.fn();
        const rabbitMqClient = {
            send: jest.fn()
        };

        // When
        const testCall = sendMqttMessage('just to test');

        // Then
        expect(testCall(dispatch, getState, rabbitMqClient)).toEqual({
            "payload": {},
            "type": "HAS BEEN SENT"
        });
        expect(rabbitMqClient.send).toHaveBeenCalledWith("/topic/smart-home", {}, "{\"test\":\"just to test\"}");
        expect(getState).not.toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();
    });
});

describe('selectLightMessage()', () => {
    test('null', () => {
        expect(selectLightMessage(null)).toEqual('no lights')
    });

    test('empty', () => {
        expect(selectLightMessage({})).toEqual('no lights')
    });

    test('no mqtt messages', () => {
        const state = {
            mqtt: {
                messages: []
            }
        };
        expect(selectLightMessage(state)).toEqual('no lights')
    });

    test('undefined light', () => {
        const state = {
            mqtt: {
                messages: [{}]
            }
        };
        expect(selectLightMessage(state)).toBeUndefined()
    });

    test('with mqtt messages', () => {
        const state = {
            mqtt: {
                messages: [{
                    test: "just for testing"
                }]
            }
        };
        expect(selectLightMessage(state)).toEqual('just for testing');
        expect(state.mqtt.messages).toHaveLength(0);
    });
});
