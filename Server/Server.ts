import * as Database from "./Database";
import { createServer, IncomingMessage, Server, ServerResponse } from "http";
let http = require("http");
let fs = require("fs")
let path = require("path")

console.log("Server starting");

let port: number = parseInt(process.env.PORT);
if (port == undefined || !(port > 0 && port <= 65536))
    port = 8100;

let publicFolder = process.argv.length > 2 ? process.argv[2] : ".";
let mediaTypes = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ts: "application/typescript",
    map: "application/octet-stream"
}

let server = http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);

function handleListen(): void {
    console.log("Listening on port: " + port);
}

interface ParameterPair {
    name: string;
    value: string;
}

class Parameters {
    parameterPairs: ParameterPair[] = [];

    push(_pair: ParameterPair) {
        this.parameterPairs.push(_pair);
    }

    getValue(name: string): string {
        let sub: ParameterPair[] = this.parameterPairs.filter((_v: ParameterPair) => _v.name == name);
        if (sub?.length >= 1) {
            return sub[0]?.value;
        }
        return null;
    }
}

function handleRequest(_request: IncomingMessage, _response: ServerResponse): void {
    console.log("Request received");

    try {
        let parts: string[] = _request.url.split("?");
        if (parts?.length < 2) {
            let filepath = path.join(publicFolder, _request.url)
            try {
                fs.readFile(filepath, function (err, data) {
                    if (err) {
                        _response.setHeader("Access-Control-Allow-Origin", "*");
                        _response.statusCode = 404
                        return _response.end("File not found or you made an invalid request.")
                    }

                    let mediaType = "text/html"
                    let ext = path.extname(filepath)
                    if (ext.length > 0 && mediaTypes.hasOwnProperty(ext.slice(1))) {
                        mediaType = mediaTypes[ext.slice(1)]
                    }

                    _response.setHeader("Access-Control-Allow-Origin", "*");
                    _response.setHeader("Content-Type", mediaType)
                    _response.end(data)
                });
            } catch (e) {
                respond(_response, JSON.stringify(e));
            }
            return;
        }

        let parameters: Parameters = new Parameters();
        let dataPart = parts[1];
        let pairs = dataPart.split("&");
        pairs.forEach((_pair: string) => {
            let temp: string[] = _pair.split("=");
            let pair: ParameterPair = {
                name: temp[0],
                value: decodeURIComponent(temp[1])
            };
            parameters.push(pair);
        });

        let command: string = parameters.getValue("command");

        switch (command) {
            case "insert":
                let fireworkDefinition: FireworkDefinition = {
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
    } catch (e) {
        respond(_response, JSON.stringify(e));
    }

    // findCallback is an inner function so that _response is in scope
    function findCallback(json: string): void {
        respond(_response, json);
    }
}

function respond(_response: ServerResponse, _text: string): void {
    console.log("Preparing response: " + _text);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write(_text);
    _response.end();
}