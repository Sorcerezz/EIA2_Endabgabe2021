namespace EIA2 {
    export class Launcher extends BaseObject {
        constructor() {
            super();
            this.position = Helper.fireworkStartPosition();
        }

        public draw(_crc2: CanvasRenderingContext2D): void {
            const radius = 25;

            _crc2.beginPath();
            _crc2.arc(this.position.x, this.position.y, radius, 0, 2 * Math.PI, false);
            _crc2.fillStyle = 'brown';
            _crc2.fill();
        }
    }
}