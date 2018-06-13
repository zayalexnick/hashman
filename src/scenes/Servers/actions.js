import api from '~/api';
import { createAction } from 'redux-act';

import IResult from '~/interfaces/IResult';

export const serversRequested = createAction('[SERVERS] Requested');
export const serversReceived = createAction('[SERVERS] Received');
export const serversFailed = createAction('[SERVERS] Failed');
export const serversSuccessed = createAction('[SERVERS] Successed');

export const getServers = () => async (dispatch) => {
    try
    {
        dispatch(serversRequested());

        const { data }: { data: IResult } = await api.get('/api/servers');

        if (data.ErrorCode < 0)
            dispatch(serversFailed({ code: data.ErrorCode, message: data.ErrorString }));
        else
            dispatch(serversSuccessed(data.Data));
    }
    catch (e)
    {
        dispatch(serversFailed({ code: null, message: e }));
    }
    finally
    {
        dispatch(serversReceived());
    }
};