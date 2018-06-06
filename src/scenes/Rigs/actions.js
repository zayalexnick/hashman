import { createAction } from 'redux-act';
import api from 'api';
import type { IResult } from "types/response";
import {authFailed, authReceived} from "../Auth/actions";

export const rigsRequested = createAction('[RIGS] REQUESTED');
export const rigsReceived = createAction('[RIGS] RECEIVED');
export const rigsSuccessed = createAction('[RIGS] SUCCESSED');
export const rigsFailed = createAction('[RIGS] FAILED');

type Rig = {
    RigID: number,
    Name: string,
    StateStr: string,
    RunMode: any,
    MaxTemp: number,
    Hashrate: string,
    Coin: string
}

type Server = {
    ServerID: number,
    ServerName: string,
    Rigs: Array<Rig>
}

type ServerFormated = {
    id: number,
    name: string,
    rigs: Array<RigFormated>
}

export const getRigs = (server) => {
    return async (dispatch) => {
        dispatch(rigsRequested());

        try
        {
            console.log(`/rigs/${server}`);
            const response = await api.get(`/api/rigs/${server}`);
            const result: IResult = response.data;

            if (result.ErrorCode < 0) dispatch(rigsFailed({ code: result.ErrorCode, message: result.ErrorString }));
            else {
                dispatch(rigsSuccessed({ data: result.Data, server }));
            }
        }
        catch(e)
        {
            console.log(e.config);
            dispatch(rigsFailed({ code: -100, message: 'Ошибка сервера' }))
        }

        dispatch(rigsReceived());
    }
};