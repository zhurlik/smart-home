import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../redux/store';
import Floors from './floors';

// import i18n (needs to be bundled ;))
import '../locales/i18n';

ReactDOM.render(
    <Provider store={store}>
        <Floors/>
    </Provider>, document.querySelector('#app'));