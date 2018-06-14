import api from '~/api';
import { createAction } from 'redux-act';

import IResult from '~/interfaces/IResult';

export const rigsRequested = createAction('[RIGS] Requested');
export const rigsReceived = createAction('[RIGS] Received');
export const rigsFailed = createAction('[RIGS] Failed');
export const rigsSuccessed = createAction('[RIGS] Successed');
export const rigsClear = createAction('[RIGS] Clear');

export const getRigs = (id) => async (dispatch) => {
    try
    {
        dispatch(rigsRequested());

        console.log('ID', id);

        const { data }: { data: IResult } = await api.get(`/api/rigs/${id}`);

        if (data.ErrorCode < 0)
            dispatch(rigsFailed({ code: data.ErrorCode, message: data.ErrorString }));
        else
            dispatch(rigsSuccessed(data.Data));
    }
    catch (e)
    {
        dispatch(rigsFailed({ code: null, message: e }));
    }
    finally
    {
        dispatch(rigsReceived());
    }
};