import { combineReducers } from 'redux';
import alertReducers from './AlertReducers';
import authReducers from './AuthReducers';

const alert = alertReducers;
const auth = authReducers;

// export default combineReducers({
//     alertState: alert,
//     authState: auth
// });

export default combineReducers({
    alert,
    auth
});