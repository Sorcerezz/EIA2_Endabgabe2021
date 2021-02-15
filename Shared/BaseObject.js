var EIA2;
(function (EIA2) {
    class BaseObject {
        constructor() {
            this.velocity = EIA2.Vector2D.zero();
            this.position = EIA2.Vector2D.zero();
        }
        attach() {
            let customEvent = new CustomEvent("attachObject", { detail: this });
            window.dispatchEvent(customEvent);
        }
        destory() {
            let customEvent = new CustomEvent("destroyObject", { detail: this });
            window.dispatchEvent(customEvent);
        }
        move(_dt) {
            if (this.velocity.x != 0) {
                this.position.x = this.position.x + (this.velocity.x * this.speed * _dt / 1000);
            }
            if (this.velocity.y != 0) {
                this.position.y = this.position.y + (this.velocity.y * this.speed * _dt / 1000);
            }
        }
    }
    EIA2.BaseObject = BaseObject;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=BaseObject.js.map