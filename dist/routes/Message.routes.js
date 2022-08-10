"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const Message_controller_1 = __importDefault(require("../controllers/Message.controller"));
const jwtVerify_1 = __importDefault(require("../middleware/jwtVerify"));
const messageController = new Message_controller_1.default();
const app = (0, express_1.default)();
const router = (0, express_2.Router)();
app.use(router);
router.post("/create", jwtVerify_1.default, messageController.CreateMessage);
router.get("/:id/:page", jwtVerify_1.default, messageController.GetMessages);
exports.default = router;
