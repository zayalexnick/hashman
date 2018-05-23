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
            const response = await api.post('/api/react_auth', data);
            const result: IResult = response.data;

            if (result.ErrorCode < 0) dispatch(authFailed({ code: result.ErrorCode, message: result.ErrorString }));
            else dispatch(authSuccessed());
        }
        catch(e)
        {
            dispatch(authFailed({ code: -100, message: 'Ошибка сервера' }))
        }

        dispatch(authReceived());
    }
};

export const logout = () => {
    return async (dispatch) => {
        try
        {
            await api.get('/api/react_logoff');
            dispatch(authLogouted());
        }
        catch (e)
        {
            console.log(e);
        }
    }
};

export const checkAuth = async () => {
    try
    {
        const response = await api.post('/api/react_auth');
        const result: IResult = response.data;
        console.log(result);

        if (result.ErrorCode < 0) return false;

        return true;
    }
    catch (e)
    {
        console.log(e);
    }
};