import axios from 'axios';
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
            const response = await axios.post('/api/react_auth', data);
            const result: IResult = response.data;

            if (result.ErrorCode < 0) dispatch(authFailed({ code: result.ErrorCode, message: result.ErrorString }));
            else dispatch(authSuccessed());
        }
        catch(e)
        {
            dispatch(authFailed({ code: -1, message: 'Ошибка сервера' }))
        }

        dispatch(authReceived());
    }
};