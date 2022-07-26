import { writeFileSync } from "fs";
import { Router } from "express";

const router = Router();

import api from "./../services/apiSwapi";

let status = 200;

router.get("/", (req, res) => {
    res.status(status).send({
        message: "Olá pequeno jedi!!!",
        status: status,
    });
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const param = req.query.categoria;
    
    try {
      status = 200;
      const result = await api.get(`/${param}/${id}`);
      //                  swapi.dev/api/films/1

      let data = result.data;
      let characters = data.characters
      let people = data.people
      let residents = data.residents
      let pilots = data.pilots
      let planets = data.planets
      let homeworld = data.homeworld
      let starships = data.starships
      let vehicles = data.vehicles
      let species = data.species
      let films = data.films

      if (characters) {
        for(const [i, e] of characters.entries()) {
          const retorno = await api.get(`/${e.split("api/")[1]}`)
          characters[i] = retorno.data.name
        }
        data.characters = characters
      }
      if (people) {
        for(const [i, e] of people.entries()) {
          const retorno = await api.get(`/${e.split("api/")[1]}`)
          people[i] = retorno.data.name
        }
        data.people = people
      }
      if (pilots) {
        for(const [i, e] of pilots.entries()) {
          const retorno = await api.get(`/${e.split("api/")[1]}`)
          pilots[i] = retorno.data.name
        }
        data.pilots = pilots
      }
      if (residents) {
        for(const [i, e] of residents.entries()) {
          const retorno = await api.get(`/${e.split("api/")[1]}`)
          residents[i] = retorno.data.name
        }
        data.residents = residents
      }
      if (planets) {
        for(const [i, e] of planets.entries()) {
          const retorno = await api.get(`/${e.split("api/")[1]}`)
          planets[i] = retorno.data.name
        }
        data.planets = planets
      }
      if (homeworld) {
        let idPlanet = data.homeworld.substring(30)
        let planetName = await api.get(`/planets/${idPlanet}`)
        data.homeworld = planetName.data.name
      }
      if (starships) {    // APARTIR ID = 4
        for(const [i, e] of starships.entries()) {
          const retorno = await api.get(`/${e.split("api/")[1]}`)
          starships[i] = retorno.data.name
        }
        data.starships = starships
      }
      if (vehicles) {   // APARTIR ID = 4
        for(const [i, e] of vehicles.entries()) {
          const retorno = await api.get(`/${e.split("api/")[1]}`)
          vehicles[i] = retorno.data.name
        }
        data.vehicles = vehicles
      }
      if (species) {
        for(const [i, e] of species.entries()) {
          const retorno = await api.get(`/${e.split("api/")[1]}`)
          species[i] = retorno.data.name
        }
        data.species = species
      }
      if (films) {
        for(const [i, e] of films.entries()) {
          const retorno = await api.get(`/${e.split("api/")[1]}`)
          films[i] = retorno.data.title
        }
        data.films = films
      }

      delete data.created
      delete data.edited
      delete data.url
      
      res.status(status).send(data);
    
    } catch (error: any) {
      status = 404;
      res.status(status).send({
        status,
        error
      });
    }
});

router.post("/", (req, res) => {
    try {
        const body = req.body;
        res.status(status).json({
            message: `Olá ${body.nome} ${body.sobrenome}`,
            status: status,
        });
    } catch (error: any) {
        status = 402;
        writeFileSync(`./../error.${Date.now()}.log`, error);
        res.status(status).json({
            error: error,
            status: status,
        });
    }
});

export default router;
