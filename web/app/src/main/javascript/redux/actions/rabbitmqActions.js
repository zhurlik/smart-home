import {createAction} from 'redux-actions'

const INCOMING_MQTT_MESSAGE = 'INCOMING MQTT MESSAGE';

/**
 * For handling incoming MQTT messages.
 *
 * @type {actionCreator} a function to convert MQTT body to javascript object
 */
export const receiveMqttMessage = createAction(INCOMING_MQTT_MESSAGE, msg => (msg && msg.body) ? JSON.parse(msg.body) : {});

/**
 *  Async Redux action for sending MQTT message to RabbitMQ.
 * @param msg todo: text?
 * @returns {function(*, *, *): {payload: {}, type: string}}
 */
export const sendMqttMessage = msg => {
    return (dispatch, getState, rabbitMqClient) => {
        rabbitMqClient.send('/topic/smart-home', {}, JSON.stringify({test: msg}));
        return {type: 'HAS BEEN SENT', payload: {}}
    }
};

/**
 * A simple selector for getting data from Redux store.
 *
 * @param state
 * @returns {string|*}
 */
export const selectLightMessage = (state) => {
    try {
        // TODO: pop()?
        return state.mqtt.messages.pop().test;
    } catch (e) {
        return "no lights";
    }
};

/**
 * Redux reducer for MQTT messages.
 *
 * @param state
 * @param action
 * @returns {{messages: []}|{messages: *[]}}
 */
export const rabbitmqReducer = (state = {messages: []}, action) => {
    switch (action.type) {
        case INCOMING_MQTT_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        }
        default: {
            return state;
        }
    }
};
