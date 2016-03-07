var express = require("express");
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var path = require("path");
var fs = require("fs");
var url = require('url');
var os = require("os");
var mongoDbService = require("./server/mongoDbService"), userListService = require("./server/userListService");
var arr = [], mainArr = [], jsonObj = {};
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname));
app.get('/',function(req, res){
  res.sendFile(path.join(__dirname+'enter.html'));
});
/*selectResult*/
app.get('/selectResult', function(req, res) {
  var queryObject = url.parse(req.url, true).query;
  /*console.log("Query " + JSON.stringify(queryObject));*/
  mongoDbService.selectResult(req, res, queryObject);
});
/*insertResult*/
app.post('/insertResult', function(req, res) {
  var queryObject = {
		userId: req.body.userId,
		userName: req.body.userName,
		message: req.body.message,
		dateStr: req.body.dateStr,
    chatId: req.body.chatId
	};
/*  console.log("Server JS   "+ JSON.stringify(queryObject));*/
  mongoDbService.insertResult(req, res, queryObject);
});
app.post('/createNewGroup', function(req, res) {
   var queryObject = {
     groupId: req.body.groupId,
     groupName: req.body.groupName,
     date: req.body.date,
     creator: req.body.creator
   };
   mongoDbService.createNewGroup(req, res, queryObject);
})
app.get('/smiley', function(req, res) {
  arr = [], mainArr = [], jsonObj = {};
  var filesName = getFiles('smiley');
  var temp = [];
  for (var i = 0; i < mainArr.length; i++) {
     if (mainArr[i].length !== 0) {
       temp.push(mainArr[i]);
     }
  }
  temp.shift();
  jsonObj.fileName = temp;
  res.send(jsonObj);
});
app.get('/getChatRoomList', function(req, res) {
  mongoDbService.getChatRoomList(req, res);
});
app.get('/getUserList', function(req, res) {
  var queryObject = url.parse(req.url, true).query;
  userListService.getUserList(req, res, queryObject);
});
var portServer = Number(process.env.PORT || 3000);
var server = app.listen(portServer, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("App listening at http://%s:%s", host, port)
});
/*Recursive smiley list*/
function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i = 0; i < files.length; i++) {
      //if (files[i].lastIndexOf(".") !== -1) {
        arr.push(dir + "/" + files[i]);
      //}
    }
    mainArr.push(arr);
    arr = [];
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}
/*Socket Instance*/
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
    socket.on('message_to_server', function(data) {
        socket.join(data.chatId);
        /*console.log(data.chatId);*/
        io.sockets.in(data.chatId).emit("message_to_client", data);
      //   fs.open('file.txt', 'a', 666, function( e, id ) {
	    // 	fs.write(id, data.userName + "~" + data.message + "~" + data.messageDate + "~" + data.userId + "~" + os.EOL, null, 'utf8', function() {
	    // 		fs.close(id, function(){
	    //  			console.log('file is updated');
	    // 		});
	   // 		});
    	// });
    });
    socket.on('userJoined_to_server', function (data) {
       /*console.log(JSON.stringify(data));*/
       socket.join(data.chatId);
       io.sockets.in(data.chatId).emit('userJoined_to_client', data)
    });
});
