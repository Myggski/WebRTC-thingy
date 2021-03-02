"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiSuccess_1 = require("../core/apiSuccess");
const RoomRepo_1 = __importDefault(require("../database/repository/RoomRepo"));
const router = express_1.Router();
// TODO: Add handlers for status codes
/**
 * Get all rooms
 */
router.get('/', (req, res, next) => {
    const rooms = RoomRepo_1.default.getRooms();
    return apiSuccess_1.Success(rooms).send(res);
});
/**
 * Get room by name
 */
router.get('/:name', (req, res, next) => {
    const room = RoomRepo_1.default.findRoomByName(req.params.name);
    apiSuccess_1.Success(room).send(res);
});
/**
 * Remove room by name
 */
router.delete('/:name', (req, res, next) => {
    const { name } = req.params;
    const room = RoomRepo_1.default.findRoomByName(name);
    if (room) {
        RoomRepo_1.default.removeRoomByName(name);
        apiSuccess_1.Success(name).send(res);
    }
});
/**
 * Create room
 */
router.post('/', (req, res, next) => {
    const room = RoomRepo_1.default.create(req.body.room);
    apiSuccess_1.Created(room).send(res);
});
exports.default = router;
//# sourceMappingURL=room.js.map