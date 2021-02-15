namespace EIA2 {
    export abstract class Animation extends BaseObject {

        duration: number;
        animating: boolean;
        lifespan: number;

        public start(_position: Vector2D): void {
            this.position = _position.copy();
            this.animating = true;
            this.lifespan = 0;
            this.attach();
        }

        public move(_dt: number): void {
            this.lifespan += _dt;
            if (this.animating) {
                super.move(_dt);
            }

            if (this.lifespan >= this.duration) {
                this.destory();
            }
        }

        getAlpha(): number {
            if (this.duration <= 0) {
                return 0;
            }
            return (this.duration - this.lifespan) / this.duration;
        }

        public progress(): number {
            return 1 - this.getAlpha();
        }
    }
} 