var EIA2;
(function (EIA2) {
    window.addEventListener("load", init);
    let crc2;
    let objects = [];
    let fireworkDefinitions;
    let selectedFireworkDefinition;
    let databaseClient;
    function init(_event) {
        databaseClient = new EIA2.DatabaseClient();
        databaseClient.refresh();
        let canvas = EIA2.Helper.canvas();
        crc2 = canvas.getContext("2d");
        new EIA2.Launcher().attach();
        canvas.addEventListener('click', (_e) => {
            const x = _e.offsetX;
            const y = _e.offsetY;
            let startPosition = new EIA2.Vector2D(x, y);
            if (selectedFireworkDefinition != null) {
                let firework = new EIA2.Firework(selectedFireworkDefinition);
                firework.position = EIA2.Helper.fireworkStartPosition();
                firework.start(startPosition);
                firework.attach();
            }
        });
        window.addEventListener('destroyObject', (_e) => {
            let object = _e.detail;
            if (object != null) {
                let index = objects.indexOf(object);
                if (index !== -1) {
                    objects.splice(index, 1);
                }
            }
        });
        window.addEventListener('attachObject', (_e) => {
            let object = _e.detail;
            if (object != null) {
                objects.push(object);
            }
        });
        window.addEventListener('fireworkDefinitionSaved', (_e) => {
            console.log("Yay saved!");
        });
        window.addEventListener('refreshFireworkDefinition', (_e) => {
            fireworkDefinitions = _e.detail;
            let container = document.getElementById('fireworks');
            fireworkDefinitions.forEach((_fireworkDefinition) => {
                let li = document.createElement("li");
                let button = document.createElement("button");
                button.textContent = _fireworkDefinition.name;
                button.classList.add("startButton");
                button.setAttribute("fireworkId", _fireworkDefinition._id);
                button.addEventListener('click', (_e) => {
                    let sender = _e.target;
                    var id = sender.getAttribute("fireworkId");
                    var items = fireworkDefinitions.filter((_fw) => _fw._id == id);
                    if ((items === null || items === void 0 ? void 0 : items.length) > 0) {
                        selectedFireworkDefinition = items[0];
                    }
                });
                li.appendChild(button);
                container.appendChild(li);
            });
        });
        loop();
    }
    function loop() {
        setTimeout(() => {
            crc2.clearRect(0, 0, EIA2.Helper.canvasWidth(), EIA2.Helper.canvasHeight());
            objects.forEach((object) => {
                object.move(EIA2.Helper.msBetweenFrames);
            });
            objects.forEach((object) => {
                object.draw(crc2);
            });
            loop();
        }, EIA2.Helper.msBetweenFrames);
    }
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Player.js.map