var EIA2;
(function (EIA2) {
    window.addEventListener("load", init);
    let crc2;
    let objects = [];
    let selectedFireworkDefinition;
    function init(_event) {
        let container = document.getElementById('fireworks');
        // TEST
        selectedFireworkDefinition = new EIA2.FireworkDefinition();
        selectedFireworkDefinition.headColor = "green";
        selectedFireworkDefinition.innerExplosionColor = "#ff0000";
        selectedFireworkDefinition.outerExplosionColor = "#00ff00";
        selectedFireworkDefinition.innerExplosionRadius = 50;
        selectedFireworkDefinition.outerExplosionRadius = 150;
        selectedFireworkDefinition.duration = 4000;
        // TODO FOR
        let li = document.createElement("li");
        let button = document.createElement("button");
        button.textContent = "Feuerwerk";
        button.classList.add("startButton");
        button.setAttribute("fireworkDefinition", "TODO");
        button.addEventListener('click', () => {
        });
        li.appendChild(button);
        container.appendChild(li);
        // END FOR
        let canvas = EIA2.Helper.canvas();
        crc2 = canvas.getContext("2d");
        new EIA2.Launcher().attach();
        canvas.addEventListener('click', (_e) => {
            const x = _e.offsetX;
            const y = _e.offsetY;
            let startPosition = new EIA2.Vector2D(x, y);
            let firework = new EIA2.Firework(selectedFireworkDefinition);
            firework.position = EIA2.Helper.fireworkStartPosition();
            firework.start(startPosition);
            firework.attach();
        });
        window.addEventListener('destroyObject', (_e) => {
            let object = _e.detail;
            if (object != null) {
                let index = objects.indexOf(object);
                if (index !== -1) {
                    console.log("Destroy object " + object);
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