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
    .then(res => {
        console.log('getPersonById');
        return res.json();
    })
    .then(json => json);
}

function getEntityByURL(url) {
    return fetch(url)
    .then(res => {
        console.log('getEntityByURL');
        return res.json();
    })
    .then(json => json);
}

function getEntityByName(name) {
    return fetch(`${DDG_URL}${name}`)
    .then(res => {
        console.log('getEntityByName');
        return res.json();
    })
    .then(json => json);
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
        entity: {
            type: EntityType,
            resolve: (person) => getEntityByName(person.name)
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

const EntityType = new GraphQLObjectType({
    name: 'Entity',
    description: '...',

    fields: () => ({
        abstract: {
            type: GraphQLString,
            resolve: (entity) => entity.Abstract
        },
        image: {
            type: GraphQLString,
            resolve: (entity) => entity.Image
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
