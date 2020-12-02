const http = require('http')
const express = require('express')
const RED = require('node-red')
const path = require('path')

// Create an Express app
const app = express()

// Add a simple route for static content served from 'public'
app.use('/', express.static('public'))

// Create a server
const server = http.createServer(app)

const settings = {
    httpAdminRoot: '/red',
    httpNodeRoot: '/api',
    userDir: path.resolve(__dirname, 'nodeRedResources'),
    functionGlobalContext: {} // enables global contextnpm
}

// Initialise the runtime with a server and settings
RED.init(server, settings)

// Serve the editor UI from /red
app.use(settings.httpAdminRoot, RED.httpAdmin)

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot, RED.httpNode)

server.listen(8000)

// Start the runtime
RED.start()

// Create the settings object - see default settings.js file for other options