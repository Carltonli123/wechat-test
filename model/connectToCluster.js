const MongoClient = require('mongodb').MongoClient;
module.exports = {
    connectToCluster: function () {
    uri = 'mongodb+srv://carlton:CarltonDatabase01!@cluster0.mgkzkrd.mongodb.net/'
    let mongoClient;

    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');

        const db = mongoClient.db('webhookDB');
        const collection = db.collection('translog');

        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
 },
  saveToTranslog: function(data){

      uri = 'mongodb+srv://carlton:CarltonDatabase01!@cluster0.mgkzkrd.mongodb.net/'
      let mongoClient;

      try {
          mongoClient = new MongoClient(uri);
          console.log('Connecting to MongoDB Atlas cluster...');
          mongoClient.connect();
          console.log('Successfully connected to MongoDB Atlas!');

          const db = mongoClient.db('webhookDB');
          const collection = db.collection('translog');
          collection.insertOne(data);

          return mongoClient;
      } catch (error) {
          console.error('Connection to MongoDB Atlas failed!', error);
          process.exit();
      }

  }
 
}