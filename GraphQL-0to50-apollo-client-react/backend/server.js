const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const db = require('./db');
const {
    graphiqlExpress,
    graphqlExpress
} = require('apollo-server-express')

const port = process.env.PORT || 9000;
const { schema } = require('./graphql/index')

const app = express();


app.use(cors(), bodyParser.json());


app.use('/graphql', graphqlExpress({
    schema
}))
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}))

app.listen(
    port, () => console.info(
        `Server started on port ${port}`
    )
);