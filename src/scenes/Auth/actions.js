import api from 'api';
import { createAction } from 'redux-act';

import { Login } from './types';
import { IResult } from "types/response";

export const authRequested = createAction('[AUTH] REQUESTED');
export const authReceived = createAction('[AUTH] RECEIVED');
export const authFailed = createAction('[AUTH] FAILED');
export const authSuccessed = createAction('[AUTH] SUCCESSED');
export const authLogouted = createAction('[AUTH] LOGOUTED');

export const login = (data: Login) => {
    return async (dispatch) => {
        dispatch(authRequested());

        try
        {
            const response = await api.post('/api/auth', data);
            const result: IResult = response.data;

            console.log(result);

            if (result.ErrorCode < 0) dispatch(authFailed({ code: result.ErrorCode, message: result.ErrorString }));
            else {
                localStorage.setItem('token', result.Data.XAuth);
                api.defaults.headers.common['XAuth'] = localStorage.getItem('token');
                dispatch(authSuccessed(result.Data || { login: null, FullName: null }));
            }
        }
        catch(e)
        {
            console.log(e);
            dispatch(authFailed({ code: -100, message: 'Ошибка сервера' }))
        }

        dispatch(authReceived());
    }
};

export const logout = () => {
    return async (dispatch) => {
        try
        {
            await api.get('/api/logoff');
            localStorage.removeItem('token');
            dispatch(authLogouted());
        }
        catch (e)
        {
            console.log(e);
        }
    }
};

export const checkAuth = () => {
    return async (dispatch) => {
        try {
            const response = await api.get('/api/auth');
            const result: IResult = response.data;

            if (result.ErrorCode === 2)
                dispatch(authSuccessed(result.Data || {login: null, FullName: null}));
        }
        catch (e) {
            console.log(e);
        }
    }
};