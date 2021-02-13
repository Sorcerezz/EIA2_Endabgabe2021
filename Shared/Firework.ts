namespace EIA2 {
    export class Firework extends BaseObject {
        animations: Animation[] = [];
        endPosition: Vector2D;
        exploding: boolean;
        fireworkDefinition: FireworkDefinition;

        constructor(_fireworkDefinition: FireworkDefinition) {
            super();
            this.fireworkDefinition = _fireworkDefinition;
            if (_fireworkDefinition != null) {
                let innerAnimation: Animation = new RadialAnimation(_fireworkDefinition.innerExplosionColor, _fireworkDefinition.innerExplosionRadius, _fireworkDefinition.duration);
                let outerAnimation: Animation = new RadialAnimation(_fireworkDefinition.outerExplosionColor, _fireworkDefinition.outerExplosionRadius, _fireworkDefinition.duration);

                this.animations.push(innerAnimation);
                this.animations.push(outerAnimation);
            }
        }

        public start(_endPosition: Vector2D): void {
            this.position = Helper.fireworkStartPosition();
            this.endPosition = _endPosition;
            this.speed = 100;
            console.log("Start: " + this.position.x + " " + this.position.y);
            console.log("Target: " + _endPosition.x + " " + _endPosition.y);
            var direction: Vector2D = Vector2D.direction(this.position, this.endPosition);
            console.log("Direction: " + direction.x + " " + direction.y);
            var length: number = direction.length();
            console.log("length: " + length);
            this.velocity = direction.normalize();
        }

        public explode(): void {
            console.log("Explode");
            this.exploding = true;
            this.animations.forEach((animation: Animation) => {
                animation.start(this.position);
            });
            this.destory();
        }

        public move(_dt: number): void {
            if (!this.exploding) {
                super.move(_dt);
                this.emitParticles();
                if (Vector2D.distance(this.position, this.endPosition) <= 2) {
                    this.explode();
                }
            }
        }

        public emitParticles(): void {
            for (let i: number = 0; i < 2; i++) {
                let particle: Particle = new Particle(this.fireworkDefinition?.tailColor);
                particle.start(this.position);
            }
        }

        public draw(_crc2: CanvasRenderingContext2D): void {
            const radius = 5;

            _crc2.beginPath();
            _crc2.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI, false);
            _crc2.fillStyle = this.fireworkDefinition?.headColor;
            _crc2.fill();

            this.animations.forEach((animation: Animation) => {
                animation.draw(_crc2);
            });
        }
    }
}