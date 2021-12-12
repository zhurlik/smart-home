import {combineReducers} from 'redux';
import {rabbitmqReducer} from '../actions/rabbitmqActions';
import {lightsReducer} from '../actions/lightActions';
import {temperatureSensorsReducer} from '../actions/temperatureSensorActions';
import {floorsAndFlatsReducer} from '../actions/floorAndFlatActions';

export default combineReducers({
    mqtt:rabbitmqReducer,
    floors: floorsAndFlatsReducer,
    lights: lightsReducer,
    temperatureSensors: temperatureSensorsReducer
})