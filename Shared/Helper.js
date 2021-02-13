var EIA2;
(function (EIA2) {
    class Helper {
        static screenWidth() {
            return document.body.clientWidth;
        }
        static screenHeight() {
            return document.body.clientHeight;
        }
        static canvas() {
            let canvas = document.getElementsByTagName("canvas")[0];
            canvas.width = Helper.screenWidth();
            canvas.height = Helper.screenHeight();
            return canvas;
        }
        static canvasWidth() {
            if (Helper.canvas() != null) {
                return Helper.canvas().width;
            }
            return 0;
        }
        static canvasHeight() {
            if (Helper.canvas() != null) {
                return Helper.canvas().height;
            }
            return 0;
        }
        static fireworkStartPosition() {
            return new EIA2.Vector2D(Helper.canvasWidth() / 2, Helper.canvasHeight());
        }
        // https://stackoverflow.com/a/5624139/633945
        static hexToRgb(_hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }
        static hexToRgba(_hex, _alpha) {
            var parts = Helper.hexToRgb(_hex);
            return 'rgba(' + parts.r + ',' + parts.g + ',' + parts.b + ',' + _alpha + ')';
        }
    }
    Helper.FPS = 30;
    Helper.msBetweenFrames = 1000 / Helper.FPS;
    EIA2.Helper = Helper;
})(EIA2 || (EIA2 = {}));
//# sourceMappingURL=Helper.js.map