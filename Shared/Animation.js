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
    var Animation = /** @class */ (function (_super) {
        __extends(Animation, _super);
        function Animation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Animation.prototype.start = function (_position) {
            this.position = _position.copy();
            this.animating = true;
            this.lifespan = 0;
            this.attach();
        };
        Animation.prototype.move = function (_dt) {
            this.lifespan += _dt;
            if (this.animating) {
                _super.prototype.move.call(this, _dt);
            }
            if (this.lifespan >= this.duration) {
                this.destory();
            }
        };
        Animation.prototype.getAlpha = function () {
            if (this.duration <= 0) {
                return 0;
            }
            return (this.duration - this.lifespan) / this.duration;
        };
        Animation.prototype.progress = function () {
            return 1 - this.getAlpha();
        };
        return Animation;
    }(EIA2.BaseObject));
    EIA2.Animation = Animation;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Animation.js.map