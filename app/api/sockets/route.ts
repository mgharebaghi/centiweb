import { Server } from 'socket.io';
import {NextApiRequest, NextApiResponse} from 'next';
import { Socket as NetSocket } from 'net';
import { Server as HttpServer } from 'http';
import { MongoClient, WithId } from 'mongodb';

const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);
client.connect();

interface SocketServer extends HttpServer {
  io?: Server;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

const SocketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', (socket) => {
      console.log('a user connected');

      socket.emit('coins', {message: "Coins from socket io"})
    });
  }

  res.end();
}

export default SocketHandler;
