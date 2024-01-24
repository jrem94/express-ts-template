import express, {NextFunction, Request, Response, Router} from "express";
import {CustomError} from "../middleware/GlobalErrorHandler";

const controller: Router = express.Router();

/**
 * GET /api/health
 * @summary Checks if the application is running
 * @tags Health
 * @returns {number} 200 - success response - application/json
 */
controller.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        res.json({data: { message: 'Health check successful!' }});
    } catch (error: any) {
        next(new CustomError(`The server was reached, but something went wrong during health check: ${error}`));
    }
});

export default controller;