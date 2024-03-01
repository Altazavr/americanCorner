const { MongoClient } = require('mongodb');
const url = "mongodb+srv://test:1234@cluster0.9i6ai63.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let usersCollection;

async function connectToMongoDB() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('mongodb подключена')
        const db = client.db();
        usersCollection = db.collection('users');
    } catch (error) {
        console.error('Произошла ошибка при подключении к mongodb', error);
    }

    return client;
}

module.exports = { connectToMongoDB }