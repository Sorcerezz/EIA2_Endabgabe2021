var EIA2;
(function (EIA2) {
    class DatabaseClient {
        constructor() {
            this.serverAddress = "https://eia2yasminwalther.herokuapp.com/";
        }
        //serverAddress: string = "http://localhost:8100/";
        insert(_fireworkDefinition) {
            let query = "command=insert";
            query += "&name=" + encodeURIComponent(_fireworkDefinition.name);
            query += "&headColor=" + encodeURIComponent(_fireworkDefinition.headColor);
            query += "&tailColor=" + encodeURIComponent(_fireworkDefinition.tailColor);
            query += "&innerExplosionColor=" + encodeURIComponent(_fireworkDefinition.innerExplosionColor);
            query += "&innerExplosionRadius=" + _fireworkDefinition.innerExplosionRadius;
            query += "&outerExplosionColor=" + encodeURIComponent(_fireworkDefinition.outerExplosionColor);
            query += "&outerExplosionRadius=" + _fireworkDefinition.outerExplosionRadius;
            query += "&duration=" + _fireworkDefinition.duration;
            console.log(query);
            this.sendRequest(query, this.handleInsertResponse);
        }
        refresh() {
            let query = "command=refresh";
            this.sendRequest(query, this.handleFindResponse);
        }
        sendRequest(_query, _callback) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.serverAddress + "?" + _query, true);
            xhr.addEventListener("readystatechange", _callback);
            xhr.send();
        }
        handleInsertResponse(_event) {
            let xhr = _event.target;
            if (xhr.readyState == XMLHttpRequest.DONE) {
                alert(xhr.response);
                var customEvent = new CustomEvent("fireworkDefinitionSaved");
                window.dispatchEvent(customEvent);
            }
        }
        handleFindResponse(_event) {
            let xhr = _event.target;
            if (xhr.readyState == XMLHttpRequest.DONE) {
                let responseAsJson = JSON.parse(xhr.response);
                console.log(responseAsJson);
                var array = [];
                if (Array.isArray(responseAsJson)) {
                    array = responseAsJson;
                }
                var customEvent = new CustomEvent("refreshFireworkDefinition", { detail: array });
                window.dispatchEvent(customEvent);
            }
        }
    }
    EIA2.DatabaseClient = DatabaseClient;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=DatabaseClient.js.map