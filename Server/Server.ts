import * as Http from "http";
import * as Url from "url";
import * as Database from "./Database";
import * as FD from "../Shared/FireworkDefinition";
import * as querystring from 'querystring';

namespace EIA2 {

    console.log("Server starting");

    let port: number = parseInt(process.env.PORT);
    if (port == undefined)
        port = 8100;

    let server: Http.Server = Http.createServer();
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    server.listen(port);

    function handleListen(): void {
        console.log("Listening on port: " + port);
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("Request received");

        var query: querystring.ParsedUrlQuery = querystring.parse(_request.url);
        var command: string = <string>query["command"];

        switch (command) {
            case "insert":
                let fireworkDefinition: FD.FireworkDefinition = {
                    name: <string>query["name"],
                    headColor: <string>query["headColor"],
                    tailColor: <string>query["tailColor"],
                    innerExplosionColor: <string>query["innerExplosionColor"],
                    innerExplosionRadius: parseInt(<string>query["innerExplosionRadius"]),
                    outerExplosionColor: <string>query["outerExplosionColor"],
                    outerExplosionRadius: parseInt(<string>query["innerExplosionRadius"]),
                    duration: parseInt(<string>query["duration"])
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
        function findCallback(json: string): void {
            respond(_response, json);
        }
    }

    function respond(_response: Http.ServerResponse, _text: string): void {
        //console.log("Preparing response: " + _text);
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.write(_text);
        _response.end();
    }
}