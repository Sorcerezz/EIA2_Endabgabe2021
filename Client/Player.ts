namespace EIA2 {
    window.addEventListener("load", init);

    let crc2: CanvasRenderingContext2D;
    let objects: BaseObject[] = [];
    let fireworkDefinitions: FireworkDefinition[];
    let selectedFireworkDefinition: FireworkDefinition;
    let databaseClient: DatabaseClient;

    function init(_event: Event): void {


        databaseClient = new DatabaseClient();
        databaseClient.refresh();

        let canvas: HTMLCanvasElement = Helper.canvas();
        crc2 = canvas.getContext("2d");
        new Launcher().attach();

        canvas.addEventListener('click', (_e: MouseEvent) => {
            const x = _e.offsetX;
            const y = _e.offsetY;
            let startPosition: Vector2D = new Vector2D(x, y);

            if (selectedFireworkDefinition != null) {
                let firework: Firework = new Firework(selectedFireworkDefinition);
                firework.position = Helper.fireworkStartPosition();
                firework.start(startPosition);
                firework.attach();
            }
        });

        window.addEventListener('destroyObject', (_e: CustomEvent) => {
            let object: BaseObject = _e.detail;
            if (object != null) {
                let index = objects.indexOf(object);
                if (index !== -1) {
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

        window.addEventListener('fireworkDefinitionSaved', (_e: CustomEvent) => {
            console.log("Yay saved!");
        });

        window.addEventListener('refreshFireworkDefinition', (_e: CustomEvent) => {
            fireworkDefinitions = _e.detail;

            let container: HTMLElement = document.getElementById('fireworks');
            fireworkDefinitions.forEach((_fireworkDefinition: FireworkDefinition) => {
                let li: HTMLElement = document.createElement("li");
                let button: HTMLButtonElement = document.createElement("button");
                button.textContent = _fireworkDefinition.name;
                button.classList.add("startButton");
                button.setAttribute("fireworkId", _fireworkDefinition._id);
                button.addEventListener('click', (_e: MouseEvent) => {
                    let sender: HTMLButtonElement = <HTMLButtonElement>_e.target;
                    var id: string = sender.getAttribute("fireworkId");
                    var items: FireworkDefinition[] = fireworkDefinitions.filter((_fw: FireworkDefinition) => _fw._id == id);
                    if (items?.length > 0) {
                        selectedFireworkDefinition = items[0];
                    }
                });
                li.appendChild(button);
                container.appendChild(li);
            });

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