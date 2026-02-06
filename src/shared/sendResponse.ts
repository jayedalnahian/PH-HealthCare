import { Response } from "express"

interface IResponseData<T, E> {
    httpStatusCode: number;
    success: boolean;
    message: string;
    data?: T;
    error: E
}


export const sendResponse = <T, E>(res: Response, responseData: IResponseData<T, E>) => {
    const { httpStatusCode, success, message, data, error } = responseData
    res.status(httpStatusCode).json({
        success,
        message,
        data,
        error
    })

}