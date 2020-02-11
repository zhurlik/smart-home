import rabbitMqClient from "../rabbitmq/stomp";
import {applyMiddleware, compose, createStore} from 'redux'
import thunk from "redux-thunk";
import rootReducer from './reducers'
import {receiveMqttMessage} from "./actions/rabbitmqActions";

const store = createStore(rootReducer,
    compose(
        // to be able to have a reference to the rabbitmq client in the functions for redux actions.
        applyMiddleware(thunk.withExtraArgument(rabbitMqClient)),
        // just for debugging
        window.devToolsExtension ? window.devToolsExtension() : f => f
        )
);

rabbitMqClient.subscribe('/topic/smart-home', (data) => {
    // console.log('>> Rabbitmq -> Redux Store: ' + data);
    store.dispatch(receiveMqttMessage(data));
});

export default store;