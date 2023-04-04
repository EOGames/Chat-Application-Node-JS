const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


let chats = [];
let chatCount = 0;

app.get('/',(req,res)=>
{
    res.sendFile(__dirname+'/index.html');
});

http.listen(4100, ()=>
{
    console.log('Server Is Up and Runnning ON Port 4100');
});


io.on('connection',(socket)=>
{
    console.log('User Connected');

    socket.on('disconnect', (socket)=>
    {
        console.log("user Disconnected");
    });


    let liveChat = '';
    socket.on('chat', (msg)=>
    {
        chatCount = chats.length-1;
        chats[chatCount+1] = msg;
        //console.log('chat ' + msg);
        liveChat = '';
        for (let i=0; i < chats.length;i++)
        {
            if (liveChat ==='')
            {
                liveChat = chats[i];
            }else
            {
                liveChat = liveChat + '\n' + chats[i];
            }
        }
        console.log(liveChat);
        io.emit('liveChat',liveChat);
    });
});