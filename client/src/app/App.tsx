import React, { useState, useEffect } from 'react';
import WindowNav from './components/WindowNav';
import BrowserMenu from './components/BrowserMenu';
import RemoteBrowser from './components/RemoteBrowser';
import socketIOClient from "socket.io-client";

import './App.global.css';

export default function App() {
  const [socket, setSocket] = useState(socketIOClient());
  useEffect(() => {
    setSocket(socketIOClient("http://localhost:3001/", { transports: ["websocket"] }))
  }, []);

  return (
    <div className="w-screen h-screen" id="app-root">
      <div className="h-full w-full flex flex-col">
        <WindowNav />
        <BrowserMenu socket={socket} />
        <RemoteBrowser socket={socket} />
      </div>
    </div>
  );
}
