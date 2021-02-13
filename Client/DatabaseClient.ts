namespace EIA2 {

    export class DatabaseClient {
        serverAddress: string = "https://eia2yasminwalther.herokuapp.com/";
        //serverAddress: string = "http://localhost:8100/";

        public insert(_fireworkDefinition: FireworkDefinition): void {
            let query: string = "command=insert";
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

        public refresh(): void {
            let query: string = "command=refresh";
            this.sendRequest(query, this.handleFindResponse);
        }

        public sendRequest(_query: string, _callback: EventListener): void {
            let xhr: XMLHttpRequest = new XMLHttpRequest();
            xhr.open("GET", this.serverAddress + "?" + _query, true);
            xhr.addEventListener("readystatechange", _callback);
            xhr.send();
        }

        public handleInsertResponse(_event: ProgressEvent): void {
            let xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
            if (xhr.readyState == XMLHttpRequest.DONE) {
                alert(xhr.response);
                var customEvent: CustomEvent = new CustomEvent("fireworkDefinitionSaved");
                window.dispatchEvent(customEvent);
            }
        }

        public handleFindResponse(_event: ProgressEvent): void {
            let xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
            if (xhr.readyState == XMLHttpRequest.DONE) {
                let responseAsJson: JSON = JSON.parse(xhr.response);
                console.log(responseAsJson);
                var customEvent: CustomEvent = new CustomEvent("refreshFireworkDefinition", { detail: responseAsJson });
                window.dispatchEvent(customEvent);
            }
        }
    }

}