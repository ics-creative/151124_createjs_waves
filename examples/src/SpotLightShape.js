///<reference path="../libs/easeljs/easeljs.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var project;
(function (project) {
    "use strict";
    /**
     * スポットライト風グラフィックの表示クラスです。
     * @author Yasunobu Ikeda a.k.a clockmaker
     */
    var SpotLightShape = (function (_super) {
        __extends(SpotLightShape, _super);
        /**
         * コンストラクタ
         */
        function SpotLightShape() {
            _super.call(this);
        }
        /**
         * 表示を更新します。
         * @param w    幅
         * @param h    高さ
         */
        SpotLightShape.prototype.drawContents = function (w, h) {
            // -------------------------
            // グラフィックのリセット
            // -------------------------
            this.graphics
                .clear()
                .beginFill(createjs.Graphics.getHSL(0, 0, 0))
                .drawRect(0, 0, w, h);
            // -------------------------
            // 1個目の円
            // -------------------------
            var dx = w * 1 / 3 + w / 10 * Math.sin(Date.now() / 4000);
            var dy = h * 1 / 3;
            var size = w / 2;
            // もやっとした円
            this.graphics.beginRadialGradientFill([createjs.Graphics.getHSL(0, 0, 100, 0.30),
                createjs.Graphics.getHSL(0, 0, 0, 0)], [0.0, 1.0], dx, dy, 0, dx, dy, size)
                .drawCircle(dx, dy, size)
                .endFill();
            // -------------------------
            // 2個目の円
            // -------------------------
            var dx = w * 3 / 4 + w / 15 * Math.cos(Date.now() / 10000);
            var dy = h * 2 / 3;
            var size = w / 3;
            // もやっとした円
            this.graphics.beginRadialGradientFill([createjs.Graphics.getHSL(0, 0, 100, 0.10),
                createjs.Graphics.getHSL(0, 0, 0, 0)], [0.0, 1.0], dx, dy, 0, dx, dy, size)
                .drawCircle(dx, dy, size)
                .endFill();
        };
        return SpotLightShape;
    }(createjs.Shape));
    project.SpotLightShape = SpotLightShape;
})(project || (project = {}));
