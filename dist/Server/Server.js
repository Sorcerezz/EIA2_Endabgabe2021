"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database = require("./Database");
const querystring = require("querystring");
const http_1 = require("http");
console.log("Server starting");
let port = parseInt(process.env.PORT);
if (port == undefined)
    port = 8100;
let server = http_1.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);
function handleListen() {
    console.log("Listening on port: " + port);
}
function handleRequest(_request, _response) {
    console.log("Request received");
    var query = querystring.parse(_request.url);
    var command = query["command"];
    switch (command) {
        case "insert":
            let fireworkDefinition = {
                name: query["name"],
                headColor: query["headColor"],
                tailColor: query["tailColor"],
                innerExplosionColor: query["innerExplosionColor"],
                innerExplosionRadius: parseInt(query["innerExplosionRadius"]),
                outerExplosionColor: query["outerExplosionColor"],
                outerExplosionRadius: parseInt(query["innerExplosionRadius"]),
                duration: parseInt(query["duration"])
            };
            Database.insert(fireworkDefinition);
            respond(_response, "storing data");
            break;
        case "refresh":
            Database.findAll(findCallback);
            break;
        default:
            respond(_response, "unknown command: " + command);
            break;
    }
    // findCallback is an inner function so that _response is in scope
    function findCallback(json) {
        respond(_response, json);
    }
}
function respond(_response, _text) {
    //console.log("Preparing response: " + _text);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write(_text);
    _response.end();
}
//# sourceMappingURL=Server.js.map