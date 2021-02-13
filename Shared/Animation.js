var EIA2;
(function (EIA2) {
    class Animation extends EIA2.BaseObject {
        start(_position) {
            this.position = _position.copy();
            this.animating = true;
            this.lifespan = 0;
            this.attach();
        }
        move(_dt) {
            this.lifespan += _dt;
            if (this.animating) {
                super.move(_dt);
            }
            if (this.lifespan >= this.duration) {
                this.destory();
            }
        }
        getAlpha() {
            if (this.duration <= 0) {
                return 0;
            }
            return (this.duration - this.lifespan) / this.duration;
        }
        progress() {
            return 1 - this.getAlpha();
        }
    }
    EIA2.Animation = Animation;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Animation.js.map