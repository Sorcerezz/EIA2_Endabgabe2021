namespace EIA2 {
    export abstract class BaseObject {

        speed: number;
        velocity: Vector2D;
        position: Vector2D;

        constructor() {
            this.velocity = Vector2D.zero();
            this.position = Vector2D.zero();
        }

        public attach(): void {
            let customEvent: CustomEvent = new CustomEvent("attachObject", { detail: this })
            window.dispatchEvent(customEvent);
        }

        public destory(): void {
            let customEvent: CustomEvent = new CustomEvent("destroyObject", { detail: this })
            window.dispatchEvent(customEvent);
        }

        public move(_dt: number): void {
            if (this.velocity.x != 0) {
                this.position.x = this.position.x + (this.velocity.x * this.speed * _dt / 1000);
            }

            if (this.velocity.y != 0) {
                this.position.y = this.position.y + (this.velocity.y * this.speed * _dt / 1000);
            }
        }

        public abstract draw(_crc2: CanvasRenderingContext2D): void;
    }
}