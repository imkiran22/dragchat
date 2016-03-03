//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/crazychat';

//Handling Mongo Service
//Selecting ResultSet with Get
this.selectResult = function (req, res) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to selectResult ');
      var collection = db.collection('crazyChatSave');
      /*res.json({"connected": true});*/
      collection.find().toArray(function (err, result) {
        res.json(result);
        //Close connection
        db.close();
      });
    }
  });
}
//Inserting Resultset with Post
this.insertResult = function (req, res, queryObject) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to insertResult');
      var collection = db.collection('crazyChatSave');/* user1 = {"name":"Harish","occupation":"Police Inspector"},
          user2 = {"name":"Antony Alex", "nick": "pappu", "occupation":"IAF Civil Clerk"};*/
      /*res.json({"connected": true});*/
      collection.insert([queryObject], function(err, result) {
        if (err) {
           console.log(err);
        } else {
           /*console.log('Inserted %d documents into the collection.'+ result);*/
           res.json({"inserted": true});
           //Close connection
           db.close();
        }
      });
    }
  });
}
