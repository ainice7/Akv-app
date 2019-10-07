import { IS_LOADING, LOADING_FAIL, REDIRECT } from '../constance';

const initialState = {
    isLoading: false,
    loadingFail: false,
    redirected: false
};

export const loading = (state = initialState, action ) => {
    switch (action.type) {
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case LOADING_FAIL:
            return {
                ...state,
                isLoading: false,
                loadingFail: action.payload
            };
        case REDIRECT: {
            return {
                ...state,
                redirected: action.payload
            }
        }
        default:
            return state;
    }
}