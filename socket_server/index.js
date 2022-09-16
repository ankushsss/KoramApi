const server = require('http').createServer()
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
})

io.on('connection', function (client) {

  console.log('client connect...', client.id);
  io.emit('message', { "l": "sadf" })
  client.on('typing', function name(data) {
    console.log(data);
    io.emit('typing', data)
  })

  client.on('message', function name(data) {
    console.log(data);
    io.emit('message', data)
  })
  client.on('offer', function name(data) {
    console.log(data);
    io.emit('offer', data)
  })
  client.on('answer', function name(data) {
    console.log(data);
    io.emit('answer', data)
  })
  client.on('candidate', function name(data) {
    console.log(data);
    io.emit('candidate', data)
  })
  


  client.on('connect', function () {
    console.log("connected")
  })

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    // handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

var server_port = process.env.PORT || 9090;
server.listen(server_port, function (err) {
  if (err) throw err
  console.log('Listening on port %d', server_port);
});

function sendTo(connection, message) {
  //console.log("Sending data: ", JSON.stringify(message));
  //console.log(Date().toLocaleString())
  io.emit(connection,JSON.stringify(message));
}
