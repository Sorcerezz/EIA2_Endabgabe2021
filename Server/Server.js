var EIA2;
(function (EIA2) {
    console.log("Server starting");
    var port = process.env.PORT;
    if (port == undefined)
        port = 8100;
    var server = Http.createServer();
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    server.listen(port);
    function handleListen() {
        console.log("Listening on port: " + port);
    }
    function handleRequest(_request, _response) {
        console.log("Request received");
        var query = Url.parse(_request.url, true).query;
        var command = query["command"];
        switch (command) {
            case "insert":
                var student = {
                    name: query["name"],
                    firstname: query["firstname"],
                    matrikel: parseInt(query["matrikel"])
                };
                Database.insert(student);
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
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Server.js.map