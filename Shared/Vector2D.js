var EIA2;
(function (EIA2) {
    var Vector2D = /** @class */ (function () {
        function Vector2D(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        Vector2D.prototype.copy = function () {
            return new Vector2D(this.x, this.y);
        };
        /**
         * Vektor Addition
         */
        Vector2D.prototype.add = function (_v) {
            return new Vector2D(this.x + _v.x, this.y + _v.y);
        };
        /**
         * Richtungsvektor aus 2 Vektoren erzeugen. Die 2 Vektoren stellen eigentlich Punkte dar. v = v2 - v1
         */
        Vector2D.direction = function (_v1, _v2) {
            return new Vector2D(_v2.x - _v1.x, _v2.y - _v1.y);
        };
        /**
         * Betrag des Vektors
         */
        Vector2D.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        /**
         * Distanz zwischen 2 Punkten
         */
        Vector2D.distance = function (_v1, _v2) {
            return Vector2D.direction(_v1, _v2).length();
        };
        /**
         * Vektor normieren. Normierter Vektor = Betrag = 1
         */
        Vector2D.prototype.normalize = function () {
            var length = this.length();
            return new Vector2D(this.x / length, this.y / length);
        };
        /**
         * Null Vektor
         */
        Vector2D.zero = function () {
            return new Vector2D(0, 0);
        };
        return Vector2D;
    }());
    EIA2.Vector2D = Vector2D;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Vector2D.js.map