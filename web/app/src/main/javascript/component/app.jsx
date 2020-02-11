import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from "../redux/store";
import LightButton from "./lightButton";

ReactDOM.render(
    <Provider store={store}>
        <LightButton/>
    </Provider>, document.querySelector('#app'));