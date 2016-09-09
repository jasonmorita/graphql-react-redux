# graphqlswapi

Super simple GraphQL example based on [GraphQL in 30 mins video](https://www.youtube.com/watch?v=UBGzsb2UkeY)  using [https://swapi.co/](https://swapi.co/) REST API.

`npm i`

`npm start`

Navigate to `http://localhost:5000`

Query like this:
```
query character {
  person(id: "21") {
    name
    url
    films {
      title
    }
    species {
      name
    }
    entity{
      image
      abstract
    }
  }
}
```
