import {combineReducers} from 'redux';
import {rabbitmqReducer} from "../actions/rabbitmqActions";

export default combineReducers({mqtt:rabbitmqReducer})