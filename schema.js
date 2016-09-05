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

function getPersonByURL(relativeURL) {
    let url = `${BASE_URL}${relativeURL}${URL_PARAMS}`;
    console.log(url);
    return fetch(url)
    .then(res => res.json())
    .then(json => {
        console.log(json);
        return json;
    });
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
            resolve: (person) => person.species
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

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
        person: {
            type: PersonType,
            args: {
                id: {type: GraphQLString}
            },
            resolve: (root, args) => getPersonByURL(`${URL_PEOPLE}/${args.id}`)
        },
        film: {
            type: PersonType,
            args: {
                id: {type: GraphQLString}
            },
            resolve: (root, args) => getPersonByURL(`${URL_FILMS}/${args.id}`)
        }
    })
});

export default new GraphQLSchema({
    query: QueryType,
});
