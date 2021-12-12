import {createAction} from 'redux-actions'

const DEFAULT_FLOORS_FLATS = [
    {
        id: 1,
        name: 'First Floor',
        flats: [
            {
                id: 1,
                name: 'kitchen',
                description: ''
            },
            {
                id: 2,
                name: 'lobby',
                description: ''
            },
            {
                id: 3,
                name: 'garage',
                description: ''
            },
            {
                id: 4,
                name: 'staircase',
                description: ''
            },
            {
                id: 5,
                name: 'terrace',
                description: ''
            }
        ]
    },
    {
        id: 2,
        name: 'Second Floor',
        flats: [
            {
                id: 1,
                name: 'bedroom1',
                description: ''
            },
            {
                id: 2,
                name: 'bedroom2',
                description: ''
            },
            {
                id: 3,
                name: 'balcony1',
                description: ''
            },
            {
                id: 4,
                name: 'balcony2',
                description: ''
            }
        ]
    },
    {
        id: 3,
        name: 'Attic floor',
        flats: [
            {
                id: 1,
                name: 'attic',
                description: ''
            }
        ]
    }
];

/**
 * Redux reducer for Floors and Flats signals.
 */
export const floorsAndFlatsReducer = (state = DEFAULT_FLOORS_FLATS, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
};
