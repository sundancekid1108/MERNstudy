import { SET_ALERT, REMOVE_ALERT } from '../Types/AlertTypes';

const initialState = {
    alerts: [],
    showAlert: false
};

const setAlert = (state, { payload }) => ({
    ...state,
    alerts: [...state.alerts, payload],
    showAlert: true
});

const removeAlert = (state, { payload }) => ({
    ...state,
    alerts: [...state.alerts].filter((alert) => alert.id !== payload),
    showAlert: false
});

const AlertReducer = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case SET_ALERT:
            return setAlert(state, action);
        case REMOVE_ALERT:
            return removeAlert(state, action);
        default:
            return state;
    }
};

export default AlertReducer;