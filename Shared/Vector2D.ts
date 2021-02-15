namespace EIA2 {
    export class Vector2D {
        x: number;
        y: number;

        constructor(_x: number, _y: number) {
            this.x = _x;
            this.y = _y;
        }

        public copy(): Vector2D {
            return new Vector2D(this.x, this.y);
        }

        /**         * Vektor Addition */
        public add(_v: Vector2D): Vector2D {
            return new Vector2D(this.x + _v.x, this.y + _v.y);
        }

        /**         * Richtungsvektor aus 2 Vektoren erzeugen. Die 2 Vektoren stellen eigentlich Punkte dar. v = v2 - v1*/
        public static direction(_v1: Vector2D, _v2: Vector2D): Vector2D {
            return new Vector2D(_v2.x - _v1.x, _v2.y - _v1.y);
        }

        /**
         * Betrag des Vektors
         */
        public length(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        /**         * Distanz zwischen 2 Punkten         */
        public static distance(_v1: Vector2D, _v2: Vector2D): number {
            return Vector2D.direction(_v1, _v2).length();
        }

        /**         * Vektor normieren. Normierter Vektor = Betrag = 1         */
        public normalize(): Vector2D {
            let length: number = this.length();
            return new Vector2D(this.x / length, this.y / length);
        }

        /**          * Null Vektor         */
        public static zero(): Vector2D {
            return new Vector2D(0, 0);
        }
    }
}