const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = process.env.DBURL;
const dbName = process.env.DBNAME;

var _db;

const connectToServer = (callback) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
        assert.equal(null, err);
        console.log('Connected successfully to server');
        _db = client.db(dbName);
        return callback(err);
    })
};

const insertDocument = async function (collection, document) {
    return new Promise((resolve, reject) => {
        _db.collection(collection).insertOne(document).then(function (result) {
            resolve(result)
        })

    });
};

const findDocuments = async function (collection) {
    return new Promise((resolve, reject) => {
        _db.collection(collection).find({}).toArray(function (err, docs) {
            if (err) reject(err);
            resolve(docs);
        });
    });

};

const updateDocument = function (collection, query, data) {
    return new Promise((resolve, reject) => {
        _db.collection(collection).updateOne(query, { $set: data }, function (err, result) {
            if (err) reject(err);
            resolve(result)
        });
    });
};

const removeDocument = function (collection, query) {
    return new Promise((resolve, reject) => {
        _db.collection(collection).deleteOne(query, function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    connectToServer,
    insertDocument,
    findDocuments,
    updateDocument,
    removeDocument
}
