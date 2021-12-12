'use strict'

import {smartHome} from '../src/emitter';
import {START} from "../src/action";

jest.mock('../src/emitter');

describe('main', () => {
    test('start app', () => {
        require('../src/main');
        expect(smartHome.emit).toHaveBeenCalledWith(START);
    });
});