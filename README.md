# Gamers Parlour Backend

## Table of contents

- [Description](#description)
- [Links](#links)
- [Installation](#installation)
- [Seeding the database](#seeding-the-database)
- [Running tests with Jest](#running-tests-with-jest)
- [Technologies](#technologies)

---

## Description

this is the back-end of the Application Gamers Parlour.
The API provide the information to the front end build on PSQL and deployed on Heroku.

---

## Links

Back End:

- The [GitHub link](https://github.com/mr-joelM/gamers-parlour-backend)of Gamers-Parlour Backend

Front End:

- A working example of the website hosted on [Netlify](https://gamers-parlour.netlify.app/)
- The [GitHub link](https://github.com/mr-joelM/gamers-parlour-frontend) of Gamers-Parlour Frontend

---

## Installation

To install Gamers Parlour Backend, follow these steps:

1. Ensure you have the following installed:

   - Node.js (download [here](https://nodejs.org/en/))
   - Postgres (download [here](https://www.postgresql.org/))

2. Fork and clone the repo

```
    git clone <repo-url>
```

3. Open the repo and install dependencies:

```
    npm install
```

---

## Seeding the database

Run `setup-dbs` to create the development and test databases locally, then seed the databases by running `seed`.

```
    npm run setup-dbs
    npm run seed
```

Information on tables structures can be found in folder `seed.js` within the `/db/seeds`.

---

## Running tests with Jest

The project was checked with Test Driven Development (TDD) using Jest.
The Tests applied can be found in folders `app.test.js` and `utils.test.js` within `__tests__`.

To run the tests:

```
    npm test                                 // run all tests
    npm test utils.test                      // run utility function tests
    npm test app.test                        // run app tests
```

---

## Technologies

The technologies and packages used for Gamers Parlour Backend:

- [Node.js](https://nodejs.org/en/) v14.17.4 LTS
- [Postgres](https://www.postgresql.org/) v13.0.0
  Project dependencies:
  -jest: v27.0.6
  -nodemon: v2.0.12
  -supertest: v6.1.4

- [Express](https://expressjs.com/) v4.17.1
- [Node-postgres](https://www.postgresql.org/) v8.7.1
- [Dotenv](https://www.npmjs.com/package/dotenv) v10.0.0
- [PG-format](https://www.npmjs.com/package/pg-format) v1.0.4
