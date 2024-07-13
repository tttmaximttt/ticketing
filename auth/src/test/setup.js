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
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
let mongo;
let collections;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongo = yield mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    yield mongoose_1.default.connect(mongoUri, {});
    process.env.JWT_KEY = 'test';
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    if (mongo) {
        yield mongo.stop();
    }
    yield mongoose_1.default.connection.close();
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    collections = yield mongoose_1.default.connection.db.collections();
    for (let collection of collections) {
        yield collection.deleteMany({});
    }
}));
global.signup = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const response = yield (0, supertest_1.default)(app_1.default)
        .post('/api/users/signup')
        .send({
        email: 'test@test.com',
        password: '123456324dsf',
    })
        .expect(201);
    const cookie = response.get('Set-Cookie');
    return (_a = cookie === null || cookie === void 0 ? void 0 : cookie[0]) !== null && _a !== void 0 ? _a : '';
});
