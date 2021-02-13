namespace EIA2 {
    export class Particle extends Animation {
        color: string;

        constructor(_color: string) {
            super();

            this.color = _color;

            let y: number = Math.random();
            let x: number = Math.random() * 2 - 1;
            this.velocity = new Vector2D(x, y).normalize();
            this.speed = 20;
            this.duration = 1000;
        }

        public draw(_crc2: CanvasRenderingContext2D): void {

            let drawColor: string = 'rgba(0, 255, 255, ' + this.getAlpha() + ')';
            if (this.color != null) {
                var parts: any = Helper.hexToRgb(this.color);
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
}