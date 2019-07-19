// const express = require('express');
// const expressGraphql = require('express-graphql');
// const schema = require('./schema');

// const app = express();
// app.get('/', (req, res) => res.end('index'));
// app.use('/graphql', expressGraphql({
//     schema,
//     graphiql: true
// }));


// app.listen(8000, (err) => {
//     if (err) {
//         throw new Error(err);
//     }
//     console.log('*** server started ***');
// });

require('@babel/register');

const express = require('express')
const expressGraphql = require('express-graphql');
const bodyParser = require('body-parser')

const { database } = require('./mongodb')
const {
    addOne, getAllList, editOne, tickOne, delOne
} = require('./controllers/list')
const schema = require('./graphql/schema')

database() // 链接数据库并且初始化数据模型

const router = express.Router()
const app = new express()
const port = 4000


app.use(bodyParser())

router.get('/', (req, res, next) => {
    res.send("home")
})

router.post('/addOne', addOne)
      .post('/editOne', editOne)
      .post('/tickOne', tickOne)
      .post('/delOne', delOne)
      .get('/getAllList', getAllList)

router.use('/graphql', expressGraphql({
    schema,
    graphiql: true
}));

app.use(router)

app.listen(port, () => {
    console.log('server listen port: ' + port)
})