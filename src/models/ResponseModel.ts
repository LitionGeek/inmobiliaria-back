import {STATUS_MESSAGES,IResponseBody,IResponse,RESPONSE_HEADERS} from'../interfaces/IResponse'
export default class ResponseModel {
    private body: IResponseBody;
    private code: number;

    /**
     * ResponseModel Constructor
     * @param data
     * @param code
     * @param message
     */
    constructor(data = {}, code = 402, message = '') {
        this.body = {
            data: data,
            message: message,
            status: STATUS_MESSAGES[code],
        };
        this.code = code;
    }

    /**
     * Add or update a body variable
     * @param variable
     * @param value
     */
    setBodyVariable = (variable: string, value: string): void => {
        this.body[variable] = value;
    }

    /**
     * Set Data
     * @param data
     */
    setData = (data: any): void => {
        this.body.data = data;
    }

    /**
     * Set Status Code
     * @param code
     */
    setCode = (code: number): void => {
        this.code = code;
    }

    /**
     * Get Status Code
     * @return {*}
     */
    getCode = (): number => {
        return this.code;
    }

    /**
     * Set message
     * @param message
     */
    setMessage = (message: string): void => {
        this.body.message = message;
    }

    /**
     * Get Message
     * @return {string|*}
     */
    getMessage = (): any => {
        return this.body.message;
    }

    /**
     * Geneate a response
     * @return {IResponse}
     */
    generate = (): IResponse => {
        return {
            statusCode: this.code,
            headers: RESPONSE_HEADERS,
            body: JSON.stringify(this.body),
        };
    }
}