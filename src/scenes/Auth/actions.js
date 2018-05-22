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

        api.post('react_auth', data)
            .then((response) => console.log('OK', response))
            .catch((error) => {
                if (error.response) console.log('RESPONSE', error.response);
                if (error.request) console.log('REQUEST', error.request);
                if (error.message) console.log('MESSAGE', error.message);
                if (error.config) console.log('CONFIG', error.config);
                console.log(error.status);
            });
        /*try
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
        }*/

        dispatch(authReceived());
    }
};