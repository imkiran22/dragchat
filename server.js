var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var path = require("path");
var fs = require("fs");
var url = require('url');
var os = require("os");
app.use(express.static(__dirname));
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/login.html'));
});

var portServer = Number(process.env.PORT || 3000);
var server = app.listen(portServer, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("App listening at http://%s:%s", host, port)
});

/*Socket Instance*/
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
    socket.on('message_to_server', function(data) {
        console.log(JSON.stringify(data));
        io.sockets.emit("message_to_client",{userName: data.userName, message: data.message});
      //   fs.open('file.txt', 'a', 666, function( e, id ) {
	    // 	fs.write(id, data.userName + "~" + data.message + "~" + data.messageDate + "~" + data.userId + "~" + os.EOL, null, 'utf8', function() {
	    // 		fs.close(id, function(){
	    //  			console.log('file is updated');
	    // 		});
	   // 		});
    	// });
    });
});
