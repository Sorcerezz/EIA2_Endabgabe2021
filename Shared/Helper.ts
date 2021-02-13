namespace EIA2 {
    export class Helper {

        public static FPS: number = 30;
        public static msBetweenFrames: number = 1000 / Helper.FPS;

        public static screenWidth(): number {
            return document.body.clientWidth;
        }

        public static screenHeight(): number {
            return document.body.clientHeight;
        }

        public static canvas(): HTMLCanvasElement {
            let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
            canvas.width = Helper.screenWidth();
            canvas.height = Helper.screenHeight();
            return canvas;
        }

        public static canvasWidth(): number {
            if (Helper.canvas() != null) {
                return Helper.canvas().width;
            }
            return 0;
        }

        public static canvasHeight(): number {
            if (Helper.canvas() != null) {
                return Helper.canvas().height;
            }
            return 0;
        }

        public static fireworkStartPosition(): Vector2D {
            return new Vector2D(Helper.canvasWidth() / 2, Helper.canvasHeight());
        }

        // https://stackoverflow.com/a/5624139/633945
        public static hexToRgb(_hex: string): any {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(_hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        public static hexToRgba(_hex: string, _alpha: number): any {
            var parts = Helper.hexToRgb(_hex);
            if (parts == null) {
                return '#000000';
            }
            return 'rgba(' + parts.r + ',' + parts.g + ',' + parts.b + ',' + _alpha + ')';
        }
    }
}