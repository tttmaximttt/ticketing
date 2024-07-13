"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lib_common_1 = require("@mr/lib-common");
const router = express_1.default.Router();
router.get("/api/users/currentUser", lib_common_1.currentUser, lib_common_1.requireAuth, (req, res) => {
    var _a;
    if (!((_a = req.ctx) === null || _a === void 0 ? void 0 : _a.user)) {
        return res.send({ user: null });
    }
    res.status(200).send({ user: req.ctx.user });
});
exports.default = router;
