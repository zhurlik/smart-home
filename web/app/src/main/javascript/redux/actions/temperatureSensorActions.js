import {createAction} from 'redux-actions'

const DEFAULT_TEMPERATURE_SENSORS = {
    '/floor/1/flat/kitchen/temperature-sensor/1': {
        celsiusDegree: undefined,
        airMoisture: undefined
    }
};

/**
 * Redux reducer for Temperature Sensors.
 */
export const temperatureSensorsReducer = (state = DEFAULT_TEMPERATURE_SENSORS, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
};
