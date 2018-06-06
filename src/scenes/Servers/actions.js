import { createAction } from 'redux-act';
import api from 'api';
import type { IResult } from "types/response";
import {authFailed, authReceived} from "../Auth/actions";

export const serversRequested = createAction('[SERVERS] REQUESTED');
export const serversReceived = createAction('[SERVERS] RECEIVED');
export const serversSuccessed = createAction('[SERVERS] SUCCESSED');
export const serversFailed = createAction('[SERVERS] FAILED');

type Server = {
    ServerID: number,
    ServerName: string,
    StateStr: string,
    Temperature: number,
    MaxTemp: number,
    uptime: number,
    RigsTotal: number,
    RigsOnline: number,
    RigsError: number,
    RigsOffline: number,
    Coins: Array<{
        Coin: string,
        hashrate: number,
        daylyIncome: number
    }>
}

type ServerFormatted = {
    id: number,
    name: string,
    state: string,
    temperature: {
        min: number,
        max: number
    },
    count: {
        total: number,
        online: number,
        error: number,
        offline: number
    },
    uptime: number,
    coins: Array
}

export const getServers = () => {
    return async (dispatch) => {
        dispatch(serversRequested());

        try
        {
            const response = await api.get('/api/servers');
            const result: IResult = response.data;

            if (result.ErrorCode < 0) dispatch(serversFailed({ code: result.ErrorCode, message: result.ErrorString }));
            else {
                dispatch(serversSuccessed({ data: result.Data }));
            }
        }
        catch(e)
        {
            console.log(e.config);
            dispatch(serversFailed({ code: -100, message: 'Ошибка сервера' }))
        }

        dispatch(serversReceived());
    }
};