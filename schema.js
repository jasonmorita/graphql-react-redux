import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
 } from 'graphql';

import fetch from 'node-fetch';

const BASE_URL = 'http://swapi.co/api';
const URL_PARAMS = '?format=json';

const URL_PEOPLE = '/people';
const URL_PLANETS = '/planets';
const URL_VEHICLES = '/vehicles';
const URL_STARSHIPS = '/starships';
const URL_FILMS = '/films';
const URL_SPECIES = '/species';

const DDG_URL = 'http://api.duckduckgo.com/?format=json&q=';

function getPersonById(id) {
    let url = `${BASE_URL}${URL_PEOPLE}/${id}${URL_PARAMS}`;
    return fetch(url)
    .then(res => res.json())
    .then(json => json);
}

function getEntityByURL(url) {
    return fetch(url)
    .then(res => res.json())
    .then(json => json);
}

function getImageByName(name) {
    return fetch(`${DDG_URL}${name}`)
    .then(res => res.json())
    .then(json => json.Image);
}

const PersonType = new GraphQLObjectType({
    name: 'Person',
    description: '...',

    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: (person) => person.name
        },
        url: {
            type: GraphQLString,
            resolve: (person) => person.url
        },
        films: {
            type: new GraphQLList(FilmType),
            resolve: (person) => person.films.map(getEntityByURL)
        },
        vehicles: {
            type: new GraphQLList(VehicleType),
            resolve: (person) => person.vehicles.map(getEntityByURL)
        },
        species: {
            type: new GraphQLList(SpeciesType),
            resolve: (person) => person.species.map(getEntityByURL)
        },
        image: {
            type: GraphQLString,
            resolve: (person) => getImageByName(person.name)
        }
    })
});

const FilmType = new GraphQLObjectType({
    name: 'Film',
    description: '...',

    fields: () => ({
        title: {
            type: GraphQLString,
            resolve: (film) => film.title
        }
    })
});

const ImageType = new GraphQLObjectType({
    name: 'Image',
    description: '...',

    fields: () => ({
        image: {
            type: GraphQLString,
            resolve: (image) => image.Image
        }
    })
});

const VehicleType = new GraphQLObjectType({
    name: 'Vehicle',
    description: '...',

    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: (vehicle) => vehicle.name
        }
    })
});

const SpeciesType = new GraphQLObjectType({
    name: 'Species',
    description: '...',

    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: (species) => species.name
        }
    })
});

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
        person: {
            type: PersonType,
            args: {
                id: {type: GraphQLString}
            },
            resolve: (root, args) => getPersonById(`${args.id}`)
        }
    })
});

export default new GraphQLSchema({
    query: QueryType,
});
