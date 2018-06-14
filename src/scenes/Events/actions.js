import api from '~/api';
import { createAction } from 'redux-act';

import IResult from '~/interfaces/IResult';

export const eventsRequested = createAction('[EVENTS] Requested');
export const eventsReceived = createAction('[EVENTS] Received');
export const eventsFailed = createAction('[EVENTS] Failed');
export const eventsSuccessed = createAction('[EVENTS] Successed');

export const getEvents = () => {
    return async (dispatch) => {
        dispatch(eventsRequested());

        try
        {
            const response = await api.get('/api/events');
            const result: IResult = response.data;

            if (result.ErrorCode < 0)
                dispatch(eventsFailed({ code: result.ErrorCode, message: result.ErrorString }));
            else
                dispatch(eventsSuccessed(result.Data));
        }
        catch (e)
        {
            console.log(e);
        }

        dispatch(eventsReceived());
    }
};