//Node servver which will handle socket io connections
const io= require('socket.io')(8000)

const users = {};

io.on('connection',socket=>{
    socket.on('new-user-joined',userName=>{
           console.log("New user",userName);
           users[socket.id]=userName;
           socket.broadcast.emit('user-joined',userName);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name: users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})