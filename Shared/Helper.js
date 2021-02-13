var EIA2;
(function (EIA2) {
    var Helper = /** @class */ (function () {
        function Helper() {
        }
        Helper.screenWidth = function () {
            return document.body.clientWidth;
        };
        Helper.screenHeight = function () {
            return document.body.clientHeight;
        };
        Helper.canvas = function () {
            var canvas = document.getElementsByTagName("canvas")[0];
            canvas.width = Helper.screenWidth();
            canvas.height = Helper.screenHeight();
            return canvas;
        };
        Helper.canvasWidth = function () {
            if (Helper.canvas() != null) {
                return Helper.canvas().width;
            }
            return 0;
        };
        Helper.canvasHeight = function () {
            if (Helper.canvas() != null) {
                return Helper.canvas().height;
            }
            return 0;
        };
        Helper.fireworkStartPosition = function () {
            return new EIA2.Vector2D(Helper.canvasWidth() / 2, Helper.canvasHeight());
        };
        // https://stackoverflow.com/a/5624139/633945
        Helper.hexToRgb = function (_hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        };
        Helper.hexToRgba = function (_hex, _alpha) {
            var parts = Helper.hexToRgb(_hex);
            return 'rgba(' + parts.r + ',' + parts.g + ',' + parts.b + ',' + _alpha + ')';
        };
        Helper.FPS = 30;
        Helper.msBetweenFrames = 1000 / Helper.FPS;
        return Helper;
    }());
    EIA2.Helper = Helper;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Helper.js.map