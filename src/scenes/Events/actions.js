import { createAction } from 'redux-act';
import api from 'api';
import type { IResult } from "types/response";

export const eventsRequested = createAction('[EVENTS] REQUESTED');
export const eventsReceived = createAction('[EVENTS] RECEIVED');
export const eventsSuccessed = createAction('[EVENTS] SUCCESSED');
export const eventsFailed = createAction('[EVENTS] FAILED');

export const getEvents = () => {
    return async (dispatch) => {
        dispatch(eventsRequested());

        try
        {
            const response = await api.get(`/api/events`);
            const result: IResult = response.data;

            if (result.ErrorCode < 0) dispatch(eventsFailed({ code: result.ErrorCode, message: result.ErrorString }));
            else {
                dispatch(eventsSuccessed({ data: result.Data }));
            }
        }
        catch(e)
        {
            console.log(e.config);
            dispatch(eventsFailed({ code: -100, message: 'Ошибка сервера' }))
        }

        dispatch(eventsReceived());
    }
};