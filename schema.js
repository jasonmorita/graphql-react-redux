import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
 } from 'graphql';

import fetch from 'node-fetch';

const BASE_URL = 'http://swapi.co/api/people';
const PARAMS = '?format=json';

function getPersonByURL(relativeURL) {
    let url = `${BASE_URL}${relativeURL}${PARAMS}`;
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
            resolve: (root, args) => getPersonByURL(`/1`)
        }
    })
});

export default new GraphQLSchema({
    query: QueryType,
});
