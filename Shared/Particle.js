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
    var Particle = /** @class */ (function (_super) {
        __extends(Particle, _super);
        function Particle(_color) {
            var _this = _super.call(this) || this;
            _this.color = _color;
            var y = Math.random();
            var x = Math.random() * 2 - 1;
            _this.velocity = new EIA2.Vector2D(x, y).normalize();
            _this.speed = 20;
            _this.duration = 1000;
            return _this;
        }
        Particle.prototype.draw = function (_crc2) {
            var drawColor = 'rgba(0, 255, 255, ' + this.getAlpha() + ')';
            if (this.color != null) {
                var parts = EIA2.Helper.hexToRgb(this.color);
                if (parts != null) {
                    drawColor = 'rgba(' + parts.r + ', ' + parts.g + ', ' + parts.b + ', ' + this.getAlpha() + ')';
                }
            }
            _crc2.beginPath();
            _crc2.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI, false);
            _crc2.fillStyle = drawColor;
            _crc2.fill();
        };
        return Particle;
    }(EIA2.Animation));
    EIA2.Particle = Particle;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Particle.js.map