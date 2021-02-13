"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database = require("./Database");
const querystring = require("querystring");
var http = require('http');
console.log("Server starting");
let port = parseInt(process.env.PORT);
if (port == undefined || !(port > 0 && port <= 65536))
    port = 8100;
let server = http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);
function handleListen() {
    console.log("Listening on port: " + port);
}
class Parameters {
    constructor() {
        this.parameterPairs = [];
    }
    push(_pair) {
        this.parameterPairs.push(_pair);
    }
    getValue(name) {
        var _a;
        var sub = this.parameterPairs.filter((_v) => _v.name == name);
        if ((sub === null || sub === void 0 ? void 0 : sub.length) >= 1) {
            return (_a = sub[0]) === null || _a === void 0 ? void 0 : _a.value;
        }
        return null;
    }
}
function handleRequest(_request, _response) {
    console.log("Request received");
    var query = querystring.parse(_request.url);
    var command = query["command"];
    var parts = _request.url.split('?');
    if ((parts === null || parts === void 0 ? void 0 : parts.length) < 2) {
        respond(_response, "Invalid query");
        return;
    }
    var parameters = new Parameters();
    var dataPart = parts[1];
    var pairs = dataPart.split('&');
    pairs.forEach((_pair) => {
        var temp = _pair.split('=');
        var pair = {
            name: temp[0],
            value: decodeURIComponent(temp[1])
        };
        parameters.push(pair);
    });
    var command = parameters.getValue("command");
    switch (command) {
        case "insert":
            let fireworkDefinition = {
                name: parameters.getValue("name"),
                headColor: parameters.getValue("headColor"),
                tailColor: parameters.getValue("tailColor"),
                innerExplosionColor: parameters.getValue("innerExplosionColor"),
                innerExplosionRadius: parseInt(parameters.getValue("innerExplosionRadius")),
                outerExplosionColor: parameters.getValue("outerExplosionColor"),
                outerExplosionRadius: parseInt(parameters.getValue("outerExplosionRadius")),
                duration: parseInt(parameters.getValue("duration"))
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