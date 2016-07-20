///<reference path="../libs/easeljs/easeljs.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var project;
(function (project) {
    "use strict";
    /** Processing のパーリンノイズ(連続した乱数)関数へのショートカットです。 */
    var noise;
    /**
     * ウェーブ風グラフィックの表示クラスです。
     * @author Yasunobu Ikeda a.k.a clockmaker
     * @see FrocessingSample by nutsu http://wonderfl.net/c/kvXp
     */
    var WaveShape = (function (_super) {
        __extends(WaveShape, _super);
        /**
         * コンストラクターです。
         * @param maxLines  線自体の個数です。
         * @param maxVertex 線の水平方向の頂点数です。
         * @param debugMode デバッグモードとして実行するかの設定です。trueの場合、デバッグ表示が有効になります。
         */
        function WaveShape(maxLines, maxVertex, debugMode) {
            if (maxLines === void 0) { maxLines = 10; }
            if (maxVertex === void 0) { maxVertex = 5; }
            if (debugMode === void 0) { debugMode = false; }
            _super.call(this);
            /** 時間経過を示す媒介変数です。
             * @type {number}
             */
            this._time = 0;
            // やむを得ない超残念実装
            noise = new Processing().noise;
            this._maxLines = maxLines;
            this._maxVertex = maxVertex;
            this._debugMode = debugMode;
            this.on("tick", this.handleTick, this);
        }
        /**
         * エンターフレームイベント
         * @param event
         */
        WaveShape.prototype.handleTick = function (event) {
            // 媒介変数を更新
            this._time += 0.002;
            // グラフィックをクリア
            this.graphics.clear();
            // 曲線を描き直す
            for (var i = 0; i < this._maxLines; i++) {
                var lineWidth = (0.05 * i) + 0.10; // ゼロ対策(ゼロのときに太さが1pxになるため)
                // デバッグ機能が有効の場合は
                if (this._debugMode == true) {
                    // 線を2pxで描く
                    lineWidth = 1.0;
                }
                this.drawWave(this._maxVertex, lineWidth, i * 0.10);
            }
        };
        /**
         * ウェーブを描きます。
         * @param vertexArr    頂点配列
         * @param strokeSize    線の太さ
         * @param timeOffset    波のオフセット
         */
        WaveShape.prototype.drawWave = function (vertexNum, strokeSize, timeOffset) {
            var stageW = window.innerWidth;
            var stageH = window.innerHeight;
            // 線のスタイルを設定
            this.graphics
                .setStrokeStyle(strokeSize)
                .beginStroke("white");
            var vertexArr = [];
            // 波の次の目標値を計算
            for (var i = 0; i <= vertexNum; i++) {
                // 乱数を取得、-0.5〜+0.5の範囲
                var noiseNum = noise(i * 0.2, this._time + timeOffset) - 0.5;
                // 目標座標を計算。画面の高さに比例
                var targetY = noiseNum * stageH * 2;
                vertexArr[i] = targetY;
            }
            // 曲線を描くためにXY座標を計算
            var BASE_Y = stageH / 2; // 基準は画面の中央のY座標
            var points = [];
            // 画面左端の座標
            points.push({ x: -200, y: BASE_Y });
            for (var i = 0; i <= vertexNum; i++) {
                // 途中座標
                points.push({
                    x: (stageW * (i / vertexNum)) >> 0,
                    y: vertexArr[i] + BASE_Y
                });
            }
            // 画面右端の座標
            points.push({ x: stageW + 200, y: BASE_Y });
            // 直線情報を曲線にするテクニック
            // 参考 : http://jsdo.it/clockmaker/createjs-curveto
            for (var i = 0; i < points.length; i++) {
                if (i >= 2) {
                    // マウスの軌跡を変数に保存
                    var p0x = points[i - 0].x;
                    var p0y = points[i - 0].y;
                    var p1x = points[i - 1].x;
                    var p1y = points[i - 1].y;
                    var p2x = points[i - 2].x;
                    var p2y = points[i - 2].y;
                    // カーブ用の頂点を割り出す
                    var curveStartX = (p2x + p1x) / 2;
                    var curveStartY = (p2y + p1y) / 2;
                    var curveEndX = (p0x + p1x) / 2;
                    var curveEndY = (p0y + p1y) / 2;
                    // カーブは中間点を結ぶ。マウスの座標は制御点として扱う。
                    this.graphics
                        .moveTo(curveStartX, curveStartY)
                        .curveTo(p1x, p1y, curveEndX, curveEndY);
                }
            }
            this.graphics.endStroke();
            // デバッグ機能
            // 曲線のもとになっている頂点を可視化
            if (this._debugMode == true) {
                for (var i = 0; i < points.length; i++) {
                    // マウスの軌跡を変数に保存
                    var p0x = points[i - 0].x;
                    var p0y = points[i - 0].y;
                    if (i > 0) {
                        var p1x = points[i - 1].x;
                        var p1y = points[i - 1].y;
                        // 線を描く
                        this.graphics
                            .setStrokeStyle(0.5)
                            .beginStroke("red")
                            .moveTo(p1x, p1y)
                            .lineTo(p0x, p0y)
                            .endStroke();
                    }
                    // 点をプロットする
                    this.graphics
                        .beginFill("red")
                        .drawCircle(p0x, p0y, 3)
                        .endFill();
                }
            }
        };
        return WaveShape;
    }(createjs.Shape));
    project.WaveShape = WaveShape;
})(project || (project = {}));
