namespace EIA2 {
    export class RadialAnimation extends Animation {

        color: string;
        radius: number;

        constructor(_color: string, _radius: number, _duration: number) {
            super();
            this.color = _color;
            this.radius = _radius;
            this.duration = _duration;
        }

        public draw(_crc2: CanvasRenderingContext2D): void {
            if (this.animating) {
                let alpha: number = this.getAlpha();
                let progress: number = this.progress();
                let radiusByProgress: number = this.radius * progress;

                _crc2.beginPath();
                _crc2.arc(this.position.x, this.position.y, radiusByProgress, 0, 2 * Math.PI, false);
                _crc2.fillStyle = Helper.hexToRgba(this.color, alpha);
                _crc2.fill();
            }
        }
    }
}