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
const fs_1 = require("fs");
const express_1 = require("express");
const router = (0, express_1.Router)();
const apiSwapi_1 = __importDefault(require("./../services/apiSwapi"));
let status = 200;
router.get("/", (req, res) => {
    res.status(status).send({
        message: "Olá Pessoa",
        status: status,
    });
});
router.get("/swapi/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const param = req.query.param;
    try {
        status = 200;
        const result = yield apiSwapi_1.default.get(`/${param}/${id}`);
        let data = result.data;
        let characters = data.characters;
        for (const [i, e] of characters.entries()) {
            const retorno = yield apiSwapi_1.default.get(`/${e.split("api/")[1]}`);
            characters[i] = retorno.data.name;
        }
        data.characters = characters;
        res.status(status).send(data);
    }
    catch (error) {
        status = 404;
        res.status(status).send({
            status,
            error
        });
    }
}));
router.post("/", (req, res) => {
    try {
        const body = req.body;
        res.status(status).json({
            message: `Olá ${body.nome} ${body.sobrenome}`,
            status: status,
        });
    }
    catch (error) {
        status = 402;
        (0, fs_1.writeFileSync)(`./../error.${Date.now()}.log`, error);
        res.status(status).json({
            error: error,
            status: status,
        });
    }
});
exports.default = router;
