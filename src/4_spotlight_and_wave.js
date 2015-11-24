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
            // ウェーブ風グラフィック用のステージを作成
            this.stageCalcInside = new createjs.Stage(document.createElement("canvas"));
            this.stageCalcInside.autoClear = false;
            // ウェーブ風グラフィックを作成
            var waveShape = new project.WaveShape();
            this.stageCalcInside.addChild(waveShape);
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
            // 薄く暗く塗る
            var context = this.stageCalcInside.canvas.getContext("2d");
            context.fillStyle = "rgba(0, 0, 0, 0.2)";
            context.fillRect(0, 0, this.stageCalcInside.canvas.width, this.stageCalcInside.canvas.height);
            // 波の表現を更新
            this.stageCalcInside.update();
            // スポットライト風グラフィックの描画
            this.spotLightShape.drawContents(innerWidth, innerHeight);
            this.stageOverlay.update();
            // 2つのステージを合成する
            var context2 = this.stageOverlay.canvas.getContext("2d");
            context2.globalCompositeOperation = "lighter";
            context2.drawImage(this.stageCalcInside.canvas, 0, 0);
        };
        /**
         * リサイズイベント
         */
        Main.prototype.handleResize = function () {
            // ウェーブ風グラフィック用ステージのりサイズ
            this.stageCalcInside.canvas.width = innerWidth;
            this.stageCalcInside.canvas.height = innerHeight;
            // スポットライト風グラフィック用ステージのりサイズ
            this.stageOverlay.canvas.width = innerWidth;
            this.stageOverlay.canvas.height = innerHeight;
        };
        return Main;
    })();
})(project || (project = {}));
