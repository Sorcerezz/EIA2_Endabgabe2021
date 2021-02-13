var EIA2;
(function (EIA2) {
    class Particle extends EIA2.Animation {
        constructor(_color) {
            super();
            this.color = _color;
            let y = Math.random();
            let x = Math.random() * 2 - 1;
            this.velocity = new EIA2.Vector2D(x, y).normalize();
            this.speed = 20;
            this.duration = 1000;
        }
        draw(_crc2) {
            let drawColor = 'rgba(0, 255, 255, ' + this.getAlpha() + ')';
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
        }
    }
    EIA2.Particle = Particle;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Particle.js.map