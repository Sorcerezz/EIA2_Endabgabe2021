var EIA2;
(function (EIA2) {
    class RadialAnimation extends EIA2.Animation {
        constructor(_color, _radius, _duration) {
            super();
            this.color = _color;
            this.radius = _radius;
            this.duration = _duration;
        }
        draw(_crc2) {
            if (this.animating) {
                let alpha = this.getAlpha();
                let progress = this.progress();
                let radiusByProgress = this.radius * progress;
                _crc2.beginPath();
                _crc2.arc(this.position.x, this.position.y, radiusByProgress, 0, 2 * Math.PI, false);
                _crc2.fillStyle = EIA2.Helper.hexToRgba(this.color, alpha);
                _crc2.fill();
            }
        }
    }
    EIA2.RadialAnimation = RadialAnimation;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=RadialAnimation.js.map