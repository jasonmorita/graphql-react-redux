# graphqlswapi

Super simple example based on [GraphQL in 30 mins video](https://www.youtube.com/watch?v=UBGzsb2UkeY)  using [https://swapi.co/](https://swapi.co/).

`npm i`

`npm start`

Navigate to `http://localhost:5000`

Query like this:
```
query Person {
  person(id: "5") {
    name
    url
    vehicles{
      name
    }
    films {
      title
    }
    species{
      name
    }
  }
}
```
