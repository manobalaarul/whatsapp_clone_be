const express = require('express');
const { Socket } = require('socket.io');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,()=>{
    console.log('Server is started at PORT',PORT);
});
// Demo activation

const io = require('socket.io')(server);

app.use(express.json());

app.get('/',(req,res)=>{
    res.json({msg: "My Socket Programming!"});
});

var clients = {};


io.on("connection",(socket)=>{
    console.log('Connected');
    console.log(socket.id,"has joined");
    socket.on('signin',(id)=>{
        console.log(id);
        clients[id] = socket;
        // console.log(clients);
        
    })

    socket.on('message',(msg)=>{
        console.log(msg);
        let targetId = msg.targetId;
        if(clients[targetId]){
            clients[targetId].emit('message',msg);
        }
       
    })
});

