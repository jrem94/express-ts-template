import express, {Request, Response, NextFunction} from 'express';
import 'reflect-metadata';
import ApplicationDataSource from "./data/database/ApplicationDataSource";
import expressJSDocSwagger from 'express-jsdoc-swagger';
import swaggerOptions from "./swaggerOptions";
import healthCheckController from "./controllers/HealthCheckController";
import globalErrorHandler from "./middleware/GlobalErrorHandler";

const app = express();
const port = 3000;

app.use(express.json());

expressJSDocSwagger(app)(swaggerOptions);

app.use('/api/health', healthCheckController);

app.use(globalErrorHandler);

ApplicationDataSource.initialize()
    .then(() => console.log('Data Source has been initialized!'))
    .catch(err => console.error('Error during Data Source initialization', err));

app.listen(port, async () => {
    console.log(`Server started at http://localhost:${port}/api/`);
    console.log(`Swagger docs hosted at http://localhost:${port}/api-docs/`);
});