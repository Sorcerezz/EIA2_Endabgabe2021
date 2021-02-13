var EIA2;
(function (EIA2) {
    var BaseObject = /** @class */ (function () {
        function BaseObject() {
            this.velocity = EIA2.Vector2D.zero();
            this.position = EIA2.Vector2D.zero();
        }
        BaseObject.prototype.attach = function () {
            var customEvent = new CustomEvent("attachObject", { detail: this });
            window.dispatchEvent(customEvent);
        };
        BaseObject.prototype.destory = function () {
            var customEvent = new CustomEvent("destroyObject", { detail: this });
            window.dispatchEvent(customEvent);
        };
        BaseObject.prototype.move = function (_dt) {
            if (this.velocity.x != 0) {
                this.position.x = this.position.x + (this.velocity.x * this.speed * _dt / 1000);
            }
            if (this.velocity.y != 0) {
                this.position.y = this.position.y + (this.velocity.y * this.speed * _dt / 1000);
            }
        };
        return BaseObject;
    }());
    EIA2.BaseObject = BaseObject;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=BaseObject.js.map