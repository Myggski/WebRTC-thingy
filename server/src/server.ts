import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { handleError, handlePageNotFound } from './middleware/handleRequests';
import { createServer, Server as HTTPServer } from 'http';
import { port, corsUrl, environment } from './config';
import routes from './routes';

export class Server {
    private httpServer: HTTPServer;
    private app: Application;
    private io: SocketIOServer;

    private readonly PORT = Number.parseInt(port || '', 10) || 5000;

    constructor() {
        this.initialize();

        this.handleSocketConnection();
        this.handleRoutes();
    }

    private initialize(): void {
        this.app = express();
        this.handleMiddleware();

        this.httpServer = createServer(this.app);
        this.io = new SocketIOServer(this.httpServer);
    }

    private handleMiddleware(): void {
        this.app.use(bodyParser.json({ limit: '10mb' }));
        this.app.use(bodyParser.urlencoded({ extended: true, limit: '10mb', parameterLimit: 50000 }));
        this.app.use(express.static(path.join(__dirname, '../../app/dist/')));
        this.app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
    }

    private handleRoutes(): void {
        this.app.get("/", (req, res, next) => {
            res.sendFile(path.join(__dirname, '../../app/dist/index.html'));
        });

        // Api-routes
        this.app.use('/api', routes);
        // Catch 404 and forward to error handler
        this.app.use(handlePageNotFound);
        // Catch errors
        this.app.use(handleError);
    }

    private handleSocketConnection(): void {
        this.io.on("connection", socket => {
            console.log("Socket connected");
        });
    }

    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.PORT, () =>
            callback(this.PORT));
    }
};