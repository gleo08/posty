import {combineReducers} from 'redux';
import currentReducer from './current';
import statusReducer from './status'

const rootReducer = combineReducers({
    status: statusReducer,
    current: currentReducer,
})

export default rootReducer;