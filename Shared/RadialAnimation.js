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
    var RadialAnimation = /** @class */ (function (_super) {
        __extends(RadialAnimation, _super);
        function RadialAnimation(_color, _radius, _duration) {
            var _this = _super.call(this) || this;
            _this.color = _color;
            _this.radius = _radius;
            _this.duration = _duration;
            return _this;
        }
        RadialAnimation.prototype.draw = function (_crc2) {
            if (this.animating) {
                var alpha = this.getAlpha();
                var progress = this.progress();
                var radiusByProgress = this.radius * progress;
                _crc2.beginPath();
                _crc2.arc(this.position.x, this.position.y, radiusByProgress, 0, 2 * Math.PI, false);
                _crc2.fillStyle = EIA2.Helper.hexToRgba(this.color, alpha);
                _crc2.fill();
            }
        };
        return RadialAnimation;
    }(EIA2.Animation));
    EIA2.RadialAnimation = RadialAnimation;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=RadialAnimation.js.map