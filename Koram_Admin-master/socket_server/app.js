const express = require('express');

const app = express();


const PORT=process.env.PORT||4000;
const server = app.listen(80,()=>{
    console.log("server is started on ",80);
});

const io= require('socket.io')(server);
var users = {};

io.on('connection',(socket)=>{
    console.log("connected successfully",socket.id);
    console.log(typeof socket.send("message"));
    
    socket.on('disconnect',()=>{
        console.log("Disconnected successfully",socket.id);

    });
    socket.on('message',(data)=>{
        console.log(data);
        socket.broadcast.emit('message-receive',data);
    });
    
});