import {Request, Response, NextFunction} from 'express'

export enum HttpStatusCode {
    OK = 200,
    ACCEPTED = 202,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}

export class CustomError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpStatusCode;

    constructor(description: string, httpCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.httpCode = httpCode;

        Error.captureStackTrace(this);
    }
}

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (!error) {
        return next();
    }

    console.error(error); // TODO: Log

    if (error instanceof CustomError) {
        res.status(error.httpCode || 500);
        res.send({ message: error.message });
    } else {
        res.status(500);
        res.send({ message: '500: Internal Server Error' });
    }
}