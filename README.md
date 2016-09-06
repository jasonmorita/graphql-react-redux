# graphqlswapi

Super simple example based on ... using 

`npm i`
`npm start`

Navigate to `http://localhost:5000`

Query like this:
`
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
`
