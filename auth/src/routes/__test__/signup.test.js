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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
describe('signup route', () => {
    it('should return a 201 on success signup', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(app_1.default)
            .post('/api/users/signup')
            .send({
            email: 'test@test.com',
            password: '123456324dsf',
        })
            .expect(201);
    }));
    it('should return a 400 when email invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(app_1.default)
            .post('/api/users/signup')
            .send({
            email: 'test',
            password: '123456324dsf',
        })
            .expect(400, { 'errors': [{ 'message': 'Email is required', 'field': 'email' }] });
    }));
    it('should set cookie on successful signup', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/api/users/signup')
            .send({
            email: 'test@gmail.com',
            password: '123456324dsf',
        })
            .expect(201);
        expect(response.get('Set-Cookie')).toBeDefined();
    }));
    it('should ...', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .post('/api/users/signup')
            .send({
            email: 'test@gmail.com',
            password: '123456324dsf',
        })
            .expect(201);
        return (0, supertest_1.default)(app_1.default)
            .post('/api/users/signup')
            .send({
            email: 'test@gmail.com',
            password: '123456324dsf',
        })
            .expect(400, { errors: [{ message: 'Email exist.' }] });
    }));
});
