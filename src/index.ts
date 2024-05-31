import express from "express";
import WebSocket, { WebSocketServer } from "ws";

const app = express();
const httpServer = app.listen(8000, ()=> {
    console.log("Server Started")
})

const wss = new WebSocketServer({ server: httpServer });

app.get("/", (req, res) => {
    res.send("Hello World");
})

wss.on("connection", (ws : WebSocket) => {
    ws.on("message", (message: string, isBinary: boolean) => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN){
                console.log(client)
                client.send(message, {binary: isBinary});
            }
        });          
    })
    ws.send("Connected to server");
})