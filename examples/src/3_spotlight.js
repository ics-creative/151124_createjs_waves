///<reference path="../libs/easeljs/easeljs.d.ts" />
///<reference path="WaveShape.ts" />
///<reference path="SpotLightShape.ts" />
var project;
(function (project) {
    // 起動コード
    window.addEventListener("load", function () {
        new Main();
    });
    /**
     * パーティクルデモのメインクラスです。
     * @class project.Main
     * @author Yasunobu Ikeda a.k.a clockmaker
     */
    var Main = (function () {
        /**
         * @constructor
         */
        function Main() {
            var _this = this;
            // スポットライト風グラフィック用のステージを作成
            this.stageOverlay = new createjs.Stage("canvasOverlay");
            // スポットライト風グラフィック
            this.spotLightShape = new project.SpotLightShape();
            this.stageOverlay.addChild(this.spotLightShape);
            // Tickerを作成
            createjs.Ticker.setFPS(60);
            createjs.Ticker.on("tick", this.handleTick, this);
            // リサイズイベント
            this.handleResize();
            window.addEventListener("resize", function () {
                _this.handleResize();
            });
        }
        /**
         * エンターフレームイベント
         */
        Main.prototype.handleTick = function () {
            // スポットライト風グラフィックの描画
            this.spotLightShape.drawContents(innerWidth, innerHeight);
            this.stageOverlay.update();
        };
        /**
         * リサイズイベント
         */
        Main.prototype.handleResize = function () {
            // スポットライト風グラフィック用ステージのりサイズ
            this.stageOverlay.canvas.width = innerWidth;
            this.stageOverlay.canvas.height = innerHeight;
        };
        return Main;
    }());
})(project || (project = {}));
