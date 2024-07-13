"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const password_1 = require("../utils/password");
const lib_common_1 = require("@mr/lib-common");
const router = express_1.default.Router();
const validators = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .notEmpty()
        .withMessage("Email is required"),
    (0, express_validator_1.body)('password')
        .trim()
        .notEmpty()
        .withMessage("Password is required"),
];
router.post("/api/users/signin", validators, lib_common_1.validateRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.User.findOne({ email });
    if (!user) {
        throw new lib_common_1.NotFoundError('User not exist.');
    }
    const isPasswordCorrect = yield password_1.Password.compare(user.password, password);
    if (!isPasswordCorrect) {
        throw new lib_common_1.BadRequestError('Password does not match');
    }
    const jwt = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_KEY);
    req.session = Object.assign(Object.assign({}, req.session), { jwt });
    res.status(200).send(user);
}));
exports.default = router;
