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
exports.getAllUsers = exports.updateUser = exports.getUser = exports.getUserByEmail = exports.registerNewUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const registerNewUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.user.create({
            data: user,
        });
    }
    catch (error) { }
});
exports.registerNewUser = registerNewUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.user.findUnique({
            where: {
                email,
            },
        });
    }
    catch (error) { }
});
exports.getUserByEmail = getUserByEmail;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findUnique({
        where: {
            id,
        },
    });
});
exports.getUser = getUser;
const updateUser = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.update({
        where: {
            id,
        },
        data: user,
    });
});
exports.updateUser = updateUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findMany();
});
exports.getAllUsers = getAllUsers;
