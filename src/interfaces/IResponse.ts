type ResponseHeader = { [header: string]: string | number | boolean; }
export interface IResponseBody {
    data: any;
    message: string;
    status?: string;
}

export interface IResponse {
    statusCode: number;
    headers: ResponseHeader;
    body: string;
}

// Enums

enum Status {
    SUCCESS = 'success',
    ERROR = 'error',
    BAD_REQUEST = 'bad request',
}

export const STATUS_MESSAGES = {
    200: Status.SUCCESS,
    400: Status.BAD_REQUEST,
    500: Status.ERROR,
}

export const RESPONSE_HEADERS: ResponseHeader = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
};
