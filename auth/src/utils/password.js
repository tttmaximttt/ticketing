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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
const node_crypto_1 = require("node:crypto");
const node_util_1 = require("node:util");
const scryptAsync = (0, node_util_1.promisify)(node_crypto_1.scrypt);
class Password {
    static toHash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = (0, node_crypto_1.randomBytes)(8).toString('hex');
            const buf = (yield scryptAsync(password, salt, 64));
            return `${buf.toString('hex')}.${salt}`;
        });
    }
    static compare(storedPass, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const [hashedPass, salt] = storedPass.split('.');
            const buf = (yield scryptAsync(password, salt, 64));
            return buf.toString('hex') === hashedPass;
        });
    }
}
exports.Password = Password;
