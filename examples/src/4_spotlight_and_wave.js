// 起動コード
window.addEventListener('load', () => {
  new Main();
});

/**
 * パーティクルデモのメインクラスです。
 * @class project.Main
 * @author Yasunobu Ikeda a.k.a clockmaker
 */
class Main {

  constructor() {
    // ウェーブ風グラフィック用のステージを作成
    this.stageCalcInside = new createjs.Stage(document.createElement('canvas'));
    this.stageCalcInside.autoClear = false;

    // ウェーブ風グラフィックを作成
    const waveShape = new WaveShape();
    this.stageCalcInside.addChild(waveShape);

    // スポットライト風グラフィック用のステージを作成
    this.stageOverlay = new createjs.Stage('canvasOverlay');

    // スポットライト風グラフィック
    this.spotLightShape = new SpotLightShape();
    this.stageOverlay.addChild(this.spotLightShape);

    // Tickerを作成
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.on('tick', this.handleTick, this);

    // リサイズイベント
    this.handleResize();
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  /**
   * エンターフレームイベント
   */
  handleTick() {
    // 薄く暗く塗る
    const context = this.stageCalcInside.canvas.getContext('2d');
    context.fillStyle = `rgba(0, 0, 0, 0.2)`;
    context.fillRect(
      0,
      0,
      this.stageCalcInside.canvas.width,
      this.stageCalcInside.canvas.height);

    // 波の表現を更新
    this.stageCalcInside.update();

    // スポットライト風グラフィックの描画
    this.spotLightShape.drawContents(innerWidth, innerHeight);
    this.stageOverlay.update();

    // 2つのステージを合成する
    const context2 = this.stageOverlay.canvas.getContext('2d');
    context2.globalCompositeOperation = 'lighter';
    context2.drawImage(this.stageCalcInside.canvas, 0, 0);
  }

  /**
   * リサイズイベント
   */
  handleResize() {
    // ウェーブ風グラフィック用ステージのりサイズ
    this.stageCalcInside.canvas.width = innerWidth;
    this.stageCalcInside.canvas.height = innerHeight;

    // スポットライト風グラフィック用ステージのりサイズ
    this.stageOverlay.canvas.width = innerWidth;
    this.stageOverlay.canvas.height = innerHeight;
  }
}
