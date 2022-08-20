"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const Conversations_controllers_1 = __importDefault(require("../controllers/Conversations.controllers"));
const jwtVerify_1 = __importDefault(require("../middleware/jwtVerify"));
const conversationController = new Conversations_controllers_1.default();
const app = (0, express_1.default)();
const router = (0, express_2.Router)();
app.use(router);
router.get("/", jwtVerify_1.default, conversationController.getMyConversations);
router.post("/create", jwtVerify_1.default, conversationController.create);
router.post("/getOneVerify", jwtVerify_1.default, conversationController.getOneVerify);
router.post("/visualization", jwtVerify_1.default, conversationController.visualization);
exports.default = router;
