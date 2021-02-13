var EIA2;
(function (EIA2) {
    window.addEventListener("load", init);
    var crc2;
    var objects = [];
    var selectedFireworkDefinition;
    function init(_event) {
        var container = document.getElementById('fireworks');
        // TEST
        selectedFireworkDefinition = new EIA2.FireworkDefinition();
        selectedFireworkDefinition.headColor = "green";
        selectedFireworkDefinition.innerExplosionColor = "#ff0000";
        selectedFireworkDefinition.outerExplosionColor = "#00ff00";
        selectedFireworkDefinition.innerExplosionRadius = 50;
        selectedFireworkDefinition.outerExplosionRadius = 150;
        selectedFireworkDefinition.duration = 4000;
        // TODO FOR
        var li = document.createElement("li");
        var button = document.createElement("button");
        button.textContent = "Feuerwerk";
        button.classList.add("startButton");
        button.setAttribute("fireworkDefinition", "TODO");
        button.addEventListener('click', function () {
        });
        li.appendChild(button);
        container.appendChild(li);
        // END FOR
        var canvas = EIA2.Helper.canvas();
        crc2 = canvas.getContext("2d");
        new EIA2.Launcher().attach();
        canvas.addEventListener('click', function (_e) {
            var x = _e.offsetX;
            var y = _e.offsetY;
            var startPosition = new EIA2.Vector2D(x, y);
            var firework = new EIA2.Firework(selectedFireworkDefinition);
            firework.position = EIA2.Helper.fireworkStartPosition();
            firework.start(startPosition);
            firework.attach();
        });
        window.addEventListener('destroyObject', function (_e) {
            var object = _e.detail;
            if (object != null) {
                var index = objects.indexOf(object);
                if (index !== -1) {
                    console.log("Destroy object " + object);
                    objects.splice(index, 1);
                }
            }
        });
        window.addEventListener('attachObject', function (_e) {
            var object = _e.detail;
            if (object != null) {
                objects.push(object);
            }
        });
        loop();
    }
    function loop() {
        setTimeout(function () {
            crc2.clearRect(0, 0, EIA2.Helper.canvasWidth(), EIA2.Helper.canvasHeight());
            objects.forEach(function (object) {
                object.move(EIA2.Helper.msBetweenFrames);
            });
            objects.forEach(function (object) {
                object.draw(crc2);
            });
            loop();
        }, EIA2.Helper.msBetweenFrames);
    }
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Player.js.map