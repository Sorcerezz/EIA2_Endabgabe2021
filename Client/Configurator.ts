namespace EIA2 {
    window.addEventListener("load", init);
    let databaseClient: DatabaseClient;
    let fireworkDefinitions: FireworkDefinition[];

    function init(_event: Event): void {
        databaseClient = new DatabaseClient();
        databaseClient.refresh();

        window.addEventListener("fireworkDefinitionSaved", (_e: CustomEvent) => {
            console.log("Roket saved!");
        });

        window.addEventListener("refreshFireworkDefinition", (_e: CustomEvent) => {
            fireworkDefinitions = _e.detail;

            let container: HTMLElement = document.getElementById("list");
            container.innerHTML = "";
            fireworkDefinitions.forEach((_fireworkDefinition: FireworkDefinition) => {
                let li: HTMLElement = document.createElement("li");
                let span: HTMLSpanElement = document.createElement("span");
                span.innerHTML = _fireworkDefinition.name;
                span.setAttribute("fireworkId", _fireworkDefinition._id);
                span.addEventListener("click", (_e: MouseEvent) => {
                    let sender: HTMLSpanElement = <HTMLSpanElement>_e.target;
                    let id: string = sender.getAttribute("fireworkId");
                    let items: FireworkDefinition[] = fireworkDefinitions.filter((_fw: FireworkDefinition) => _fw._id == id);
                    if (items?.length > 0) {
                        let item = items[0];

                        let input: HTMLInputElement = <HTMLInputElement>document.getElementById("name");
                        input.value = item.name;

                        input = <HTMLInputElement>document.getElementById("headColor");
                        input.value = item.headColor;

                        input = <HTMLInputElement>document.getElementById("tailColor");
                        input.value = item.tailColor;

                        input = <HTMLInputElement>document.getElementById("innerExplosionColor");
                        input.value = item.innerExplosionColor;

                        input = <HTMLInputElement>document.getElementById("innerExplosionRadius");
                        input.value = item.innerExplosionRadius + "";

                        input = <HTMLInputElement>document.getElementById("outerExplosionColor");
                        input.value = item.outerExplosionColor;

                        input = <HTMLInputElement>document.getElementById("outerExplosionRadius");
                        input.value = item.outerExplosionRadius + "";

                        input = <HTMLInputElement>document.getElementById("duration");
                        input.value = item.duration + "";
                    }
                });

                li.appendChild(span);
                container.appendChild(li);
            });

            let saveButton: HTMLElement = document.getElementById("saveButton");
            saveButton.addEventListener("click", () => {
                let item: FireworkDefinition = new FireworkDefinition();
                item.name = (<HTMLInputElement>document.getElementById("name")).value;
                item.headColor = (<HTMLInputElement>document.getElementById("headColor")).value;
                item.tailColor = (<HTMLInputElement>document.getElementById("tailColor")).value;
                item.innerExplosionColor = (<HTMLInputElement>document.getElementById("innerExplosionColor")).value;
                item.innerExplosionRadius = parseInt((<HTMLInputElement>document.getElementById("innerExplosionRadius")).value);
                item.outerExplosionColor = (<HTMLInputElement>document.getElementById("outerExplosionColor")).value;
                item.outerExplosionRadius = parseInt((<HTMLInputElement>document.getElementById("outerExplosionRadius")).value);
                item.duration = parseInt((<HTMLInputElement>document.getElementById("duration")).value);

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

            let newButton: HTMLElement = document.getElementById("newButton");
            newButton.addEventListener("click", () => {
                let input: HTMLInputElement = <HTMLInputElement>document.getElementById("name");
                input.value = "";

                input = <HTMLInputElement>document.getElementById("headColor");
                input.value = "";

                input = <HTMLInputElement>document.getElementById("tailColor");
                input.value = "";

                input = <HTMLInputElement>document.getElementById("innerExplosionColor");
                input.value = "";

                input = <HTMLInputElement>document.getElementById("innerExplosionRadius");
                input.value = "";

                input = <HTMLInputElement>document.getElementById("outerExplosionColor");
                input.value = "";

                input = <HTMLInputElement>document.getElementById("outerExplosionRadius");
                input.value = "";

                input = <HTMLInputElement>document.getElementById("duration");
                input.value = "";
            });

            window.addEventListener("fireworkDefinitionSaved", (_e: CustomEvent) => {
                console.log("Item saved!");
                let container: HTMLElement = document.getElementById("list");
                container.innerHTML = "Speichert...";
                databaseClient.refresh();
            });
        });
    }
} 