import {createAction} from 'redux-actions'

const DEFAULT_LIGHTS = {
    '/floor/1/flat/kitchen/light/bar1': {
        state: undefined
    },
    '/floor/1/flat/lobby/light/mirror1': {
        state: undefined
    }
};

/**
 * Redux reducer for Lights signals.
 */
export const lightsReducer = (state = DEFAULT_LIGHTS, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
};
