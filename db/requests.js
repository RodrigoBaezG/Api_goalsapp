const db = require('./config');

function requestAllGoals(table, callback) {
    return db.any(`SELECT * FROM ${table}`)
        .then(data => {
            callback(null, data);
        })
        .catch(error => {
            callback(error, null);
        }); 
};

function request(table, id, callback) {
    return db.any(`SELECT * FROM ${table} WHERE id = ${id}`)
        .then(data => {     
            callback(null, data);
        })
        .catch(error => {
            callback(error, null);
        }); 
};

module.exports = {
    requestAllGoals, 
    request   
};