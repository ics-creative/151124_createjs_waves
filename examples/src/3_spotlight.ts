///<reference path="../libs/easeljs/easeljs.d.ts" />
///<reference path="WaveShape.ts" />
///<reference path="SpotLightShape.ts" />

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
		private stageOverlay:createjs.Stage;
		private spotLightShape:SpotLightShape;

		/**
		 * @constructor
		 */
		constructor() {
			// スポットライト風グラフィック用のステージを作成
			this.stageOverlay = new createjs.Stage("canvasOverlay");

			// スポットライト風グラフィック
			this.spotLightShape = new SpotLightShape();
			this.stageOverlay.addChild(this.spotLightShape);

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
			// スポットライト風グラフィックの描画
			this.spotLightShape.drawContents(innerWidth, innerHeight);
			this.stageOverlay.update();
		}

		/**
		 * リサイズイベント
		 */
		private handleResize():void {
			// スポットライト風グラフィック用ステージのりサイズ
			this.stageOverlay.canvas.width = innerWidth;
			this.stageOverlay.canvas.height = innerHeight;
		}
	}
}