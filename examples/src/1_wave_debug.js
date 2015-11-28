///<reference path="../libs/easeljs/easeljs.d.ts" />
///<reference path="WaveShape.ts" />
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
            // 初期設定
            this.stageCalcInside = new createjs.Stage("canvasWave");
            // パーティクルサンプルを作成
            var waveShape = new project.WaveShape(1, 4, true);
            this.stageCalcInside.addChild(waveShape);
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
            // 波の表現を更新
            this.stageCalcInside.update();
        };
        /**
         * リサイズイベント
         */
        Main.prototype.handleResize = function () {
            this.stageCalcInside.canvas.width = innerWidth;
            this.stageCalcInside.canvas.height = innerHeight;
        };
        return Main;
    })();
})(project || (project = {}));
