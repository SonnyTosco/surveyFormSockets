var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var route = require('./routes/index.js')(app);

var server = app.listen(8000, function(){
  console.log("listening on port 8000");
});

var io = require('socket.io').listen(server)
io.sockets.on('connection', function(socket) {
  console.log("You used to call me on my socket");
//2 the server listens for an event 'posting_form' and then this event gets triggered,
//organizes all the emitted information to form a single message and sends this single message
// with the event called 'updated_message'. It also EMITs an event called 'random_number' with a random number
// between 1-1000
  socket.on("posting_form", function (users){
    socket.emit('updated_message', {res: users.submitted_info});
    socket.emit('random_number', {res: function(){
        var random = Math.floor((Math.random() * 1000) + 1)
        return random;
    }});
  });

});
