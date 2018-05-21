export type IError = {
    code: number,
    message: string
};

export type IResult = {
    ErrorCode: number,
    ErrorString: string,
    Data?: any
};