# vremotebrowser
Electron client connection to headless chromium located on the server.

## Tech Stack

### Client

* React
* TailwindCSS
* Electron

### Server

* Express
* Nodejs
* Puppeteer
* Socketio

## Getting Started


1. `yarn install` in main directory
2. `yarn start:server` in one terminal
3. `yarn start:client` in another terminal

## Build client
* Windows : `yarn client:build:linux`
* Linux : `yarn client:build:Linux`
* Mac : `yarn client:build:mac`

## Applicatiion Demo

## Features
1. Remote connects to headless puppeteer browser. Client retrieves images from server through socketio
2. User input from client side goes to server side
3. All clients connect to the same user
4. Able to resize
5. page navigation
6. Page search **Issues with puppeteer**

## Features TODO

* Multiple tabs for the browser
* allow to create private instance or public instance
* client local single instance
