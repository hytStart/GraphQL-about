const {
    DataStore
} = require('notarealdb')

const store = new DataStore('./mock')

module.exports = {
    students: store.collection('student'),
    colleges: store.collection('school')
}