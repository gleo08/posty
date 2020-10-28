import {combineReducers} from 'redux';
import currentReducer from './current';
import showingReducer from './showing';
import statusReducer from './status'

const rootReducer = combineReducers({
    status: statusReducer,
    current: currentReducer,
    showing: showingReducer,
})

export default rootReducer;