/**
    @flow
 */

import axios from 'axios';
import { createAction } from 'redux-act';
import IResult from '~/interfaces/IResult';

export const authRequested = createAction('[AUTH] Requested');
export const authRecieved = createAction('[AUTH] Received');
export const authSuccessed = createAction('[AUTH] Successed');
export const authFailed = createAction('[AUTH] Failed');

type State = {
    login: string,
    password: string
};

export const signin = ({ login, password }: State) => {
    return async (dispatch) => {
        dispatch(authRequested());

        try
        {
            const response = await axios.post('/api/auth', { login, password });
            const result: IResult = response.data;

            if (result.ErrorCode < 0)
                dispatch(authFailed({ code: result.ErrorCode, message: result.ErrorString }));
            else
                dispatch(authSuccessed(result.Data));
        }
        catch (e)
        {
            console.log(e);
        }

        dispatch(authRecieved());
    }
};