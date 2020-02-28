const db = require('../database/dbConfig');

module.exports =  {
    add,
    findBy
}

function add(body) {
    return db('users')
    .insert(body)
}

function findBy(filter) {
    return db('users')
    .where(filter)
}