///<reference path="../libs/easeljs/easeljs.d.ts" />

namespace project {
	"use strict";

	/** Processing のパーリンノイズ(連続した乱数)関数へのショートカットです。 */
	var noise:Function;

	/**
	 * ウェーブ風グラフィックの表示クラスです。
	 * @author Yasunobu Ikeda a.k.a clockmaker
	 * @see FrocessingSample by nutsu http://wonderfl.net/c/kvXp
	 */
	export class WaveShape extends createjs.Shape {

		private time:number = 0;
		private vertexArr:any[][];
		/** 線自体の個数です。 */
		private MAX_LINES:number = 10;
		/** 線の水平方向の頂点数です。 */
		private MAX_VERTEX:number = 10;

		constructor() {
			super();

			// やむを得ない超残念実装
			noise = new Processing().noise;

			this.vertexArr = [];

			for (let i = 0; i < this.MAX_LINES; i++) {
				this.vertexArr[i] = [];
				let num = (this.MAX_VERTEX - 1) * Math.random() * Math.random() + 1;
				for (let j = 0; j <= num; j++) {
					this.vertexArr[i][j] = 0;
				}
			}

			this.on("tick", this.handleTick, this);
		}

		/**
		 * エンターフレームイベント
		 * @param event
		 */
		private handleTick(event:createjs.Event):void {
			this.time += 0.005;

			this.graphics.clear();

			for (let i = 0; i < this.MAX_LINES; i++) {
				this.drawWave(
					this.vertexArr[i],
					(0.05 * i) + 0.001, // ゼロ対策(ゼロのときに太さが1pxになるため)
					i * 0.10);
			}
		}


		/**
		 * ウェーブを描きます。
		 * @param vertexArr    頂点配列
		 * @param strokeSize    線の太さ
		 * @param timeOffset    波のオフセット
		 */
		private drawWave(vertexArr:number[], strokeSize:number, timeOffset:number):void {

			const vertexNum = vertexArr.length - 1;
			var stageW = window.innerWidth;
			var stageH = window.innerHeight;

			// 線のスタイルを設定
			this.graphics.setStrokeStyle(strokeSize).beginStroke("white");

			// 波の次の目標値を計算
			for (let i = 0; i <= vertexNum; i++) {
				vertexArr[i] += (((noise(i * 0.2, this.time + timeOffset) - 0.5) * innerHeight * 2) - vertexArr[i]) * 0.05;
			}

			// 曲線を描くためにXY座標を計算
			const BASE_Y = stageH / 2;
			const points:{x:number, y:number}[] = [];
			points.push({x: -200, y: BASE_Y});
			for (let i = 0; i <= vertexNum; i++) {
				points.push({
					x: (stageW * (i / vertexNum)) >> 0,
					y: vertexArr[i] + BASE_Y
				});
			}
			points.push({x: stageW + 200, y: BASE_Y});

			// 直線情報を曲線にするテクニック
			// 参考 : http://jsdo.it/clockmaker/createjs-curveto
			for (let i = 0; i < points.length; i++) {
				if (i >= 2) {
					// マウスの軌跡を変数に保存
					let p0x = points[i - 0].x;
					let p0y = points[i - 0].y;
					let p1x = points[i - 1].x;
					let p1y = points[i - 1].y;
					let p2x = points[i - 2].x;
					let p2y = points[i - 2].y;
					// カーブ用の頂点を割り出す

					let curveStartX = (p2x + p1x) / 2;
					let curveStartY = (p2y + p1y) / 2;
					let curveEndX = (p0x + p1x) / 2;
					let curveEndY = (p0y + p1y) / 2;
					// カーブは中間点を結ぶ。マウスの座標は制御点として扱う。
					this.graphics
						.moveTo(curveStartX, curveStartY)
						.curveTo(p1x, p1y, curveEndX, curveEndY);
				}
			}

			this.graphics.endStroke();
		}
	}
}

declare var Processing:any;