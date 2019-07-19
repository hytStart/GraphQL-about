const fs = require('fs')
const path = require('path')
const {
    makeExecutableSchema
} = require('graphql-tools')

const typeDefs = fs.readFileSync(path.resolve(__dirname, './schema.graphql'), {
    encoding: 'utf-8'
})
const resolvers = require('./resolvers')


// const typeDefinition = `
//    type Query  {
//       greeting: String
//    }
// `
// const resolverObject = {
//     Query : {
//        greeting: () => 'Hello GraphQL  From TutorialsPoint !!'
//     }
//  }

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})
// const schema = makeExecutableSchema({
//     typeDefs: typeDefinition,
//     resolvers: resolverObject,
// })

module.exports = {
    schema
}