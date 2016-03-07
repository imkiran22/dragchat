//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://127.0.0.1:27017/crazychat';

this.getUserList = function (req, res, queryObject) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      var collection = db.collection('users'),
          regex = {userName : { $regex: queryObject.keyword } };
      collection.find(regex).toArray(function (err, result) {
        if(result.length == 0) {
          res.json({"userNotFound": true});
        } else {
          res.json(result);
        }
        db.close();
      });
    }
  });
}
