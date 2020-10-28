/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import store from './store';
import React from 'react';
import TrackPlayer from 'react-native-track-player';

const RNRedux = () => {
    return (
        <Provider store = { store }>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => RNRedux);
TrackPlayer.registerPlaybackService(() => require('./service'));
