import axios from 'axios';
import { createAction } from 'redux-act';

import IResult from '~/interfaces/IResult';

export const serversRequested = createAction('[SERVERS] Requested');
export const serversReceived = createAction('[SERVERS] Received');
export const serversFailed = createAction('[SERVERS] Failed');
export const serversSuccessed = createAction('[SERVERS] Successed');

export const getServers = () => {
    return async (dispatch) => {
        dispatch(serversRequested());

        try
        {
            const response = await axios.get('/api/servers');
            const result: IResult = response.data;

            if (result.ErrorCode < 0)
                dispatch(serversFailed({ code: result.ErrorCode, message: result.ErrorString }));
            else
                dispatch(serversSuccessed(result.Data));
        }
        catch (e)
        {
            console.log(e);
        }

        dispatch(serversReceived());
    }
};