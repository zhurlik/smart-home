import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../redux/store';
import Floors from './floors';
// import i18n (needs to be bundled ;))
import '../locales/i18n';

import { makeStyles } from '@material-ui/core/styles';
import Flag from 'react-world-flags';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
      small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
}));

ReactDOM.render(
    <Provider store={store}>
            <a id="download">Download</a>
            <Avatar alt={'Russian'} color={'secondary'}>
                <Flag width={12} height={12} code={'RU'}/>
            </Avatar>
            <Avatar alt={'English'} color={'secondary'}>
                <Flag  width={12} height={12} code={'US'}/>
            </Avatar>
        <Floors/>
    </Provider>, document.querySelector('#app'));