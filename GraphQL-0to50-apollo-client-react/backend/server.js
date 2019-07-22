const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const db = require('./db');
const {
    graphiqlExpress,
    graphqlExpress
} = require('apollo-server-express')


const expressJwt = require('express-jwt') //auth
const jwt = require('jsonwebtoken') //auth

const port = process.env.PORT || 9000;
const {
    schema
} = require('./graphql/index')
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64')


const app = express();


app.use(cors(), bodyParser.json(), expressJwt({
    secret: jwtSecret,
    credentialsRequired: false
}));

app.use('/graphql', graphqlExpress((req) => ({
    schema,
    context: {
        user: req.user && db.students.get(req.user.sub)
    }
})))

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}))

//authenticate students
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = db.students.list().find((user) => user.email === email);
    if (!(user && user.password === password)) {
        res.sendStatus(401);
        return;
    }
    const token = jwt.sign({
        sub: user.id
    }, jwtSecret);
    res.send({
        token
    });
});

app.listen(
    port, () => console.info(
        `Server started on port ${port}`
    )
);