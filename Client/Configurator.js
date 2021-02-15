var EIA2;
(function (EIA2) {
    window.addEventListener("load", init);
    let databaseClient;
    let fireworkDefinitions;
    function init(_event) {
        databaseClient = new EIA2.DatabaseClient();
        databaseClient.refresh();
        window.addEventListener("fireworkDefinitionSaved", (_e) => {
            console.log("Roket saved!");
        });
        window.addEventListener("refreshFireworkDefinition", (_e) => {
            fireworkDefinitions = _e.detail;
            let container = document.getElementById("list");
            container.innerHTML = "";
            fireworkDefinitions.forEach((_fireworkDefinition) => {
                let li = document.createElement("li");
                let span = document.createElement("span");
                span.innerHTML = _fireworkDefinition.name;
                span.setAttribute("fireworkId", _fireworkDefinition._id);
                span.addEventListener("click", (_e) => {
                    let sender = _e.target;
                    let id = sender.getAttribute("fireworkId");
                    let items = fireworkDefinitions.filter((_fw) => _fw._id == id);
                    if (items ? .length > 0 : ) {
                        let item = items[0];
                        let input = document.getElementById("name");
                        input.value = item.name;
                        input = document.getElementById("headColor");
                        input.value = item.headColor;
                        input = document.getElementById("tailColor");
                        input.value = item.tailColor;
                        input = document.getElementById("innerExplosionColor");
                        input.value = item.innerExplosionColor;
                        input = document.getElementById("innerExplosionRadius");
                        input.value = item.innerExplosionRadius + "";
                        input = document.getElementById("outerExplosionColor");
                        input.value = item.outerExplosionColor;
                        input = document.getElementById("outerExplosionRadius");
                        input.value = item.outerExplosionRadius + "";
                        input = document.getElementById("duration");
                        input.value = item.duration + "";
                    }
                });
                li.appendChild(span);
                container.appendChild(li);
            });
            let saveButton = document.getElementById("saveButton");
            saveButton.addEventListener("click", () => {
                let item = new EIA2.FireworkDefinition();
                item.name = document.getElementById("name").value;
                item.headColor = document.getElementById("headColor").value;
                item.tailColor = document.getElementById("tailColor").value;
                item.innerExplosionColor = document.getElementById("innerExplosionColor").value;
                item.innerExplosionRadius = parseInt(document.getElementById("innerExplosionRadius").value);
                item.outerExplosionColor = document.getElementById("outerExplosionColor").value;
                item.outerExplosionRadius = parseInt(document.getElementById("outerExplosionRadius").value);
                item.duration = parseInt(document.getElementById("duration").value);
                if (item.name == null || item.name == ""
                    || item.headColor == null || item.headColor == ""
                    || item.tailColor == null || item.tailColor == ""
                    || item.innerExplosionColor == null || item.innerExplosionColor == ""
                    || item.outerExplosionColor == null || item.outerExplosionColor == "") {
                    alert("Bitte alle Felder ausfüllen");
                    return;
                }
                databaseClient.insert(item);
            });
            let newButton = document.getElementById("newButton");
            newButton.addEventListener("click", () => {
                let input = document.getElementById("name");
                input.value = "";
                input = document.getElementById("headColor");
                input.value = "";
                input = document.getElementById("tailColor");
                input.value = "";
                input = document.getElementById("innerExplosionColor");
                input.value = "";
                input = document.getElementById("innerExplosionRadius");
                input.value = "";
                input = document.getElementById("outerExplosionColor");
                input.value = "";
                input = document.getElementById("outerExplosionRadius");
                input.value = "";
                input = document.getElementById("duration");
                input.value = "";
            });
            window.addEventListener("fireworkDefinitionSaved", (_e) => {
                console.log("Item saved!");
                let container = document.getElementById("list");
                container.innerHTML = "Speichert...";
                databaseClient.refresh();
            });
        });
    }
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Configurator.js.map