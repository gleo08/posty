import {combineReducers} from 'redux';
import currentReducer from './current'

const rootReducer = combineReducers({
    play: currentReducer,
})

export default rootReducer;