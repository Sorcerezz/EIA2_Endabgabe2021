var EIA2;
(function (EIA2) {
    class Firework extends EIA2.BaseObject {
        constructor() {
            super(...arguments);
            this.animations = [];
        }
        letructor(_fireworkDefinition) {
            super();
            this.fireworkDefinition = _fireworkDefinition;
            if (_fireworkDefinition != null) {
                let innerAnimation = new EIA2.RadialAnimation(_fireworkDefinition.innerExplosionColor, _fireworkDefinition.innerExplosionRadius, _fireworkDefinition.duration);
                let outerAnimation = new EIA2.RadialAnimation(_fireworkDefinition.outerExplosionColor, _fireworkDefinition.outerExplosionRadius, _fireworkDefinition.duration);
                this.animations.push(innerAnimation);
                this.animations.push(outerAnimation);
            }
        }
        start(_endPosition) {
            this.position = EIA2.Helper.fireworkStartPosition();
            this.endPosition = _endPosition;
            this.speed = 100;
            console.log("Start: " + this.position.x + " " + this.position.y);
            console.log("Target: " + _endPosition.x + " " + _endPosition.y);
            let direction = EIA2.Vector2D.direction(this.position, this.endPosition);
            console.log("Direction: " + direction.x + " " + direction.y);
            let length = direction.length();
            console.log("length: " + length);
            this.velocity = direction.normalize();
        }
        explode() {
            console.log("Explode");
            this.exploding = true;
            this.animations.forEach((animation) => {
                animation.start(this.position);
            });
            this.destory();
        }
        move(_dt) {
            if (!this.exploding) {
                super.move(_dt);
                this.emitParticles();
                if (EIA2.Vector2D.distance(this.position, this.endPosition) <= 2) {
                    this.explode();
                }
            }
        }
        emitParticles() {
            for (let i = 0; i < 1; i++) {
                let particle = new EIA2.Particle(this.fireworkDefinition ? .tailColor : );
                particle.start(this.position);
            }
        }
        draw(_crc2) {
            let radius = 5;
            _crc2.beginPath();
            _crc2.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI, false);
            _crc2.fillStyle = this.fireworkDefinition ? .headColor : ;
            _crc2.fill();
            this.animations.forEach((animation) => {
                animation.draw(_crc2);
            });
        }
    }
    EIA2.Firework = Firework;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Firework.js.map