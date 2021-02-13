namespace EIA2 {
    window.addEventListener("load", init);

    let crc2: CanvasRenderingContext2D;
    let objects: BaseObject[] = [];
    let selectedFireworkDefinition: FireworkDefinition;

    function init(_event: Event): void {
        let container: HTMLElement = document.getElementById('fireworks');

        // TEST
        selectedFireworkDefinition = new FireworkDefinition();
        selectedFireworkDefinition.headColor = "green";
        selectedFireworkDefinition.innerExplosionColor = "#ff0000";
        selectedFireworkDefinition.outerExplosionColor = "#00ff00";
        selectedFireworkDefinition.innerExplosionRadius = 50;
        selectedFireworkDefinition.outerExplosionRadius = 150;
        selectedFireworkDefinition.duration = 4000;

        // TODO FOR
        let li: HTMLElement = document.createElement("li");
        let button: HTMLButtonElement = document.createElement("button");
        button.textContent = "Feuerwerk";
        button.classList.add("startButton");
        button.setAttribute("fireworkDefinition", "TODO");
        button.addEventListener('click', () => {

        });
        li.appendChild(button);
        container.appendChild(li);
        // END FOR

        let canvas: HTMLCanvasElement = Helper.canvas();
        crc2 = canvas.getContext("2d");
        new Launcher().attach();

        canvas.addEventListener('click', (_e: MouseEvent) => {
            const x = _e.offsetX;
            const y = _e.offsetY;
            let startPosition: Vector2D = new Vector2D(x, y);

            let firework: Firework = new Firework(selectedFireworkDefinition);
            firework.position = Helper.fireworkStartPosition();
            firework.start(startPosition);
            firework.attach();
        });

        window.addEventListener('destroyObject', (_e: CustomEvent) => {
            let object: BaseObject = _e.detail;
            if (object != null) {
                let index = objects.indexOf(object);
                if (index !== -1) {
                    console.log("Destroy object " + object);
                    objects.splice(index, 1);
                }
            }
        });

        window.addEventListener('attachObject', (_e: CustomEvent) => {
            let object: BaseObject = _e.detail;
            if (object != null) {
                objects.push(object);
            }
        });

        loop();
    }

    function loop(): void {
        setTimeout(() => {
            crc2.clearRect(0, 0, Helper.canvasWidth(), Helper.canvasHeight());
            objects.forEach((object: BaseObject) => {
                object.move(Helper.msBetweenFrames);
            });

            objects.forEach((object: BaseObject) => {
                object.draw(crc2);
            });

            loop();
        }, Helper.msBetweenFrames);
    }
}