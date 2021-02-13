var EIA2;
(function (EIA2) {
    class Launcher extends EIA2.BaseObject {
        constructor() {
            super();
            this.position = EIA2.Helper.fireworkStartPosition();
        }
        draw(_crc2) {
            const radius = 25;
            _crc2.beginPath();
            _crc2.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI, false);
            _crc2.fillStyle = 'brown';
            _crc2.fill();
        }
    }
    EIA2.Launcher = Launcher;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Launcher.js.map