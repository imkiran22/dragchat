//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://127.0.0.1:27017/crazychat';
this.createNewGroup = function (req, res, queryObject) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      /*console.log('Connection established to selectResult ');*/
      var collection = db.collection('createNewGroup');
      /*res.json({"connected": true});*/
      collection.insert(queryObject, function(err, result) {
        /*console.log("Mongo Service "+ JSON.stringify(queryObject));*/
        if (err) {
           console.log(err);
        } else {
           /*console.log("Mongo Service "+ JSON.stringify(queryObject));*/
           /*console.log('Inserted %d documents into the collection.'+ result);*/
           res.json({"inserted": true});
           //Close connection
           db.close();
        }
      });
    }
  });
}
//Handling Mongo Service
//Selecting ResultSet with Get
this.selectResult = function (req, res, queryObject) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      /*console.log('Connection established to selectResult ');*/
      var collection = db.collection('crazyTemple');
      /*res.json({"connected": true});*/
      collection.find(queryObject).toArray(function (err, result) {
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
      var collection = db.collection('crazyTemple');
      collection.insert(queryObject, function(err, result) {
        /*console.log("Mongo Service "+ JSON.stringify(queryObject));*/
        if (err) {
           console.log(err);
        } else {
           /*console.log("Mongo Service "+ JSON.stringify(queryObject));*/
           /*console.log('Inserted %d documents into the collection.'+ result);*/
           res.json({"inserted": true});
           //Close connection
           db.close();
        }
      });
    }
  });
}
//Getting Chat Room list
this.getChatRoomList = function (req, res, queryObject) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      var collection = db.collection('createNewGroup');
      collection.find(queryObject).toArray(function (err, result) {
        res.json(result);
        //Close connection
        db.close();
      });
    }
  });
};
