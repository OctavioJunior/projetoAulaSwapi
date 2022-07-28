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
        message: "Olá pequeno jedi!!!",
        status: status,
    });
});
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const param = req.query.categoria;
    const categoryList = [
        "people",
        "films",
        "vehicles",
        "starships",
        "planets",
        "species"
    ];
    const categoryCheck = categoryList.some(elem => elem === param);
    if (!categoryCheck) {
        res.status(status).send(`Categoria não existe, tente uma destas: ${categoryList.toString()}`);
        return;
    }
    try {
        status = 200;
        const result = yield apiSwapi_1.default.get(`/${param}/${id}`);
        //                  swapi.dev/api/films/1
        let data = result.data;
        let characters = data.characters;
        let people = data.people;
        let residents = data.residents;
        let pilots = data.pilots;
        let planets = data.planets;
        let homeworld = data.homeworld;
        let starships = data.starships;
        let vehicles = data.vehicles;
        let species = data.species;
        let films = data.films;
        if (characters) {
            for (const [i, e] of characters.entries()) {
                const retorno = yield apiSwapi_1.default.get(`/${e.split("api/")[1]}`);
                characters[i] = retorno.data.name;
            }
            data.characters = characters;
        }
        if (people) {
            for (const [i, e] of people.entries()) {
                const retorno = yield apiSwapi_1.default.get(`/${e.split("api/")[1]}`);
                people[i] = retorno.data.name;
            }
            data.people = people;
        }
        if (pilots) {
            for (const [i, e] of pilots.entries()) {
                const retorno = yield apiSwapi_1.default.get(`/${e.split("api/")[1]}`);
                pilots[i] = retorno.data.name;
            }
            if (pilots.length) {
                console.log("pilots is not null");
                data.pilots = pilots;
            }
            else {
                console.log("pilots is empty");
                delete data.pilots;
            }
        }
        if (residents) {
            for (const [i, e] of residents.entries()) {
                const retorno = yield apiSwapi_1.default.get(`/${e.split("api/")[1]}`);
                residents[i] = retorno.data.name;
            }
            if (residents.length) {
                console.log("residents is not null");
                data.residents = residents;
            }
            else {
                console.log("residents is empty");
                delete data.residents;
            }
        }
        if (planets) {
            for (const [i, e] of planets.entries()) {
                const retorno = yield apiSwapi_1.default.get(`/${e.split("api/")[1]}`);
                planets[i] = retorno.data.name;
            }
            data.planets = planets;
        }
        if (homeworld) {
            let idPlanet = data.homeworld.substring(30);
            let planetName = yield apiSwapi_1.default.get(`/planets/${idPlanet}`);
            data.homeworld = planetName.data.name;
        }
        if (starships) { // APARTIR ID = 2
            for (const [i, e] of starships.entries()) {
                const retorno = yield apiSwapi_1.default.get(`/${e.split("api/")[1]}`);
                starships[i] = retorno.data.name;
            }
            if (starships.length) {
                console.log("starships is not null");
                data.starships = starships;
            }
            else {
                console.log("starships is empty");
                delete data.starships;
            }
        }
        if (vehicles) { // APARTIR ID = 4
            for (const [i, e] of vehicles.entries()) {
                const retorno = yield apiSwapi_1.default.get(`/${e.split("api/")[1]}`);
                vehicles[i] = retorno.data.name;
            }
            if (vehicles.length) {
                console.log("Vehicles is not null");
                data.vehicles = vehicles;
            }
            else {
                console.log("Vehicles is empty");
                delete data.vehicles;
            }
        }
        if (species) {
            for (const [i, e] of species.entries()) {
                const retorno = yield apiSwapi_1.default.get(`/${e.split("api/")[1]}`);
                species[i] = retorno.data.name;
            }
            if (species.length) {
                console.log("species is not null");
                data.species = species;
            }
            else {
                console.log("Vehicles is empty");
                delete data.species;
            }
        }
        if (films) {
            for (const [i, e] of films.entries()) {
                const retorno = yield apiSwapi_1.default.get(`/${e.split("api/")[1]}`);
                films[i] = retorno.data.title;
            }
            data.films = films;
        }
        delete data.created;
        delete data.edited;
        delete data.url;
        res.status(status).send(data);
    }
    catch (err) {
        res.status(err.response.status).send(err.message);
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
