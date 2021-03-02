'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const bodyParser = __importStar(require("body-parser"));
const path = __importStar(require("path"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const ApiError_1 = require("./core/ApiError");
const http_1 = require("http");
const config_1 = require("./config");
const routes_1 = __importDefault(require("./routes"));
class Server {
    constructor() {
        this.DEFAULT_PORT = Number.parseInt(config_1.port || '', 10) || 5000;
        this.initialize();
        this.handleSocketConnection();
        this.handleRoutes();
    }
    initialize() {
        this.app = express_1.default();
        this.handleMiddleware();
        this.httpServer = http_1.createServer(this.app);
        this.io = new socket_io_1.Server(this.httpServer);
    }
    handleMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express_1.default.static(path.join(__dirname, '../../app/dist/')));
        this.app.use(cors_1.default({ origin: config_1.corsUrl, optionsSuccessStatus: 200 }));
    }
    handleRoutes() {
        this.app.get("/", (req, res, next) => {
            res.sendFile(path.join(__dirname, "../../app/dist/index.html"));
        });
        this.app.use("/api", routes_1.default);
        this.app.use("*", (req, res, next) => {
            res.send("Make sure url is correct!");
        });
        this.app.use((err, req, res, next) => {
            console.log(err);
            if (err instanceof ApiError_1.ApiError) {
                ApiError_1.ApiError.handle(err, res);
            }
            else {
                if (config_1.environment === 'development') {
                    return res.status(500).send(err.message);
                }
                ApiError_1.ApiError.handle(new ApiError_1.InternalError(), res);
            }
        });
    }
    handleSocketConnection() {
        this.io.on("connection", socket => {
            console.log("Socket connected");
        });
    }
    listen(callback) {
        this.httpServer.listen(this.DEFAULT_PORT, () => callback(this.DEFAULT_PORT));
    }
}
exports.Server = Server;
;
//# sourceMappingURL=server.js.map