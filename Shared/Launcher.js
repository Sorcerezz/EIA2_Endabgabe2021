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
    var Launcher = /** @class */ (function (_super) {
        __extends(Launcher, _super);
        function Launcher() {
            var _this = _super.call(this) || this;
            _this.position = EIA2.Helper.fireworkStartPosition();
            return _this;
        }
        Launcher.prototype.draw = function (_crc2) {
            var radius = 25;
            _crc2.beginPath();
            _crc2.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI, false);
            _crc2.fillStyle = 'brown';
            _crc2.fill();
        };
        return Launcher;
    }(EIA2.BaseObject));
    EIA2.Launcher = Launcher;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Launcher.js.map