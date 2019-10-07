import {IS_LOADING, LOADING_FAIL, REDIRECT} from '../constance';

export const isLoading = (isLoading) => ({ type: IS_LOADING, payload: isLoading });
export const loadingFail = (loadingFail) => ({ type: LOADING_FAIL, payload: loadingFail });
export const redirect = (boolean) => ({ type: REDIRECT, payload: boolean });