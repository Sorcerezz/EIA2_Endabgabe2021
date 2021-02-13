var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var EIA2;
(function (EIA2) {
    var Firework = /** @class */ (function (_super) {
        __extends(Firework, _super);
        function Firework(_fireworkDefinition) {
            var _this = _super.call(this) || this;
            _this.animations = [];
            _this.fireworkDefinition = _fireworkDefinition;
            if (_fireworkDefinition != null) {
                var innerAnimation = new EIA2.RadialAnimation(_fireworkDefinition.innerExplosionColor, _fireworkDefinition.innerExplosionRadius, _fireworkDefinition.duration);
                var outerAnimation = new EIA2.RadialAnimation(_fireworkDefinition.outerExplosionColor, _fireworkDefinition.outerExplosionRadius, _fireworkDefinition.duration);
                _this.animations.push(innerAnimation);
                _this.animations.push(outerAnimation);
            }
            return _this;
        }
        Firework.prototype.start = function (_endPosition) {
            this.position = EIA2.Helper.fireworkStartPosition();
            this.endPosition = _endPosition;
            this.speed = 100;
            console.log("Start: " + this.position.x + " " + this.position.y);
            console.log("Target: " + _endPosition.x + " " + _endPosition.y);
            var direction = EIA2.Vector2D.direction(this.position, this.endPosition);
            console.log("Direction: " + direction.x + " " + direction.y);
            var length = direction.length();
            console.log("length: " + length);
            this.velocity = direction.normalize();
        };
        Firework.prototype.explode = function () {
            var _this = this;
            console.log("Explode");
            this.exploding = true;
            this.animations.forEach(function (animation) {
                animation.start(_this.position);
            });
            this.destory();
        };
        Firework.prototype.move = function (_dt) {
            if (!this.exploding) {
                _super.prototype.move.call(this, _dt);
                this.emitParticles();
                if (EIA2.Vector2D.distance(this.position, this.endPosition) <= 2) {
                    this.explode();
                }
            }
        };
        Firework.prototype.emitParticles = function () {
            var _a;
            for (var i = 0; i < 2; i++) {
                var particle = new EIA2.Particle((_a = this.fireworkDefinition) === null || _a === void 0 ? void 0 : _a.tailColor);
                particle.start(this.position);
            }
        };
        Firework.prototype.draw = function (_crc2) {
            var _a;
            var radius = 5;
            _crc2.beginPath();
            _crc2.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI, false);
            _crc2.fillStyle = (_a = this.fireworkDefinition) === null || _a === void 0 ? void 0 : _a.headColor;
            _crc2.fill();
            this.animations.forEach(function (animation) {
                animation.draw(_crc2);
            });
        };
        return Firework;
    }(EIA2.BaseObject));
    EIA2.Firework = Firework;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Firework.js.map