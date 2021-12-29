import { GET_THEATERSLIST } from '../Types/Index';

const initialState = {
    theaters: []
};

const theatersReducers = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_THEATERSLIST:
            return {
                ...state,
                theaters: payload
            };
        default:
            return state;
    }
};

export default theatersReducers;