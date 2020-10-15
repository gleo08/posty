import {combineReducers} from 'redux';
import {currentReducer} from './current'

const rootReducer = combineReducers({
    currentSong: currentReducer,
})

export default rootReducer;