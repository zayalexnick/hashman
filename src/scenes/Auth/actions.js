import api from 'api';
import { createAction } from 'redux-act';

import { Login } from './types';
import { IResult } from "types/response";

export const authRequested = createAction('[AUTH] REQUESTED');
export const authReceived = createAction('[AUTH] RECEIVED');
export const authFailed = createAction('[AUTH] FAILED');
export const authSuccessed = createAction('[AUTH] SUCCESSED');

export const login = (data: Login) => {
    return async (dispatch) => {
        dispatch(authRequested());

        try
        {
            const response = await api.post('react_auth', data);
            console.log(response);
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