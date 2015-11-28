///<reference path="../libs/easeljs/easeljs.d.ts" />
///<reference path="WaveShape.ts" />

namespace project {

	// 起動コード
	window.addEventListener("load", ()=> {
		new Main();
	});

	/**
	 * パーティクルデモのメインクラスです。
	 * @class project.Main
	 * @author Yasunobu Ikeda a.k.a clockmaker
	 */
	class Main {
		private stageCalcInside:createjs.Stage;

		/**
		 * @constructor
		 */
		constructor() {

			// 初期設定
			this.stageCalcInside = new createjs.Stage("canvasWave");

			// パーティクルサンプルを作成
			var waveShape = new WaveShape(1, 4, true);
			this.stageCalcInside.addChild(waveShape);

			// Tickerを作成
			createjs.Ticker.setFPS(60);
			createjs.Ticker.on("tick", this.handleTick, this);

			// リサイズイベント
			this.handleResize();
			window.addEventListener("resize", ()=> {
				this.handleResize()
			});
		}


		/**
		 * エンターフレームイベント
		 */
		private handleTick():void {
			// 波の表現を更新
			this.stageCalcInside.update();
		}

		/**
		 * リサイズイベント
		 */
		private handleResize():void {
			this.stageCalcInside.canvas.width = innerWidth;
			this.stageCalcInside.canvas.height = innerHeight;
		}
	}
}