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

		/** 時間経過を示す媒介変数です。 */
		private _time:number = 0;
		/**
		 * 曲線の頂点座標(Y座標)の配列です。
		 * 滑らかな曲線にするため配列に保持してイージングを摘要して管理しています。
		 */
		private _vertexArr:number[][];
		/** 線自体の個数です。 */
		private _maxLines:number = 10;
		/** 線の水平方向の頂点数です。 */
		private _maxVertex:number = 10;

		/**
		 * コンストラクターです。
		 * @param maxLines  線自体の個数です。
		 * @param maxVertex 線の水平方向の頂点数です。
		 */
		constructor(maxLines:number = 10, maxVertex:number = 10) {
			super();

			// やむを得ない超残念実装
			noise = new Processing().noise;

			this._maxLines = maxLines;
			this._maxVertex = maxVertex;

			this._vertexArr = [];

			// Yの頂点座標の初期値を設定
			for (let i = 0; i < this._maxLines; i++) {
				this._vertexArr[i] = [];
				// 頂点座標の上限値はランダムで
				let num = (this._maxVertex - 1) * Math.random() * Math.random() + 1;
				for (let j = 0; j <= num; j++) {
					// 初期値は全て0で。
					this._vertexArr[i][j] = 0;
				}
			}

			this.on("tick", this.handleTick, this);
		}

		/**
		 * エンターフレームイベント
		 * @param event
		 */
		private handleTick(event:createjs.Event):void {
			// 媒介変数を更新
			this._time += 0.005;

			// グラフィックをクリア
			this.graphics.clear();

			// 曲線を描き直す
			for (let i = 0; i < this._maxLines; i++) {
				this.drawWave(
					this._vertexArr[i],
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
		private drawWave(vertexArr:number[],
		                 strokeSize:number,
		                 timeOffset:number):void {

			const vertexNum = vertexArr.length - 1;
			const stageW = window.innerWidth;
			const stageH = window.innerHeight;

			// 線のスタイルを設定
			this.graphics
				.setStrokeStyle(strokeSize)
				.beginStroke("white");

			// 波の次の目標値を計算
			for (let i = 0; i <= vertexNum; i++) {
				// 乱数を取得、-0.5〜+0.5の範囲
				let noiseNum = noise(i * 0.2, this._time + timeOffset) - 0.5;
				// 目標座標を計算。画面の高さに比例
				let targetY = noiseNum * stageH * 2;
				// イージングの公式を使って、頂点座標をなめらかに変化させる
				vertexArr[i] += (targetY - vertexArr[i]) * 0.05;
			}

			// 曲線を描くためにXY座標を計算
			const BASE_Y = stageH / 2; // 基準は画面の中央のY座標
			const points:{x:number, y:number}[] = [];
			// 画面左端の座標
			points.push({x: -200, y: BASE_Y});
			for (let i = 0; i <= vertexNum; i++) {
				// 途中座標
				points.push({
					x: (stageW * (i / vertexNum)) >> 0,
					y: vertexArr[i] + BASE_Y
				});
			}
			// 画面右端の座標
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