// 起動コード
window.addEventListener('load', () => {
  new Main();
});

/**
 * パーティクルデモのメインクラスです。
 * @author Yasunobu Ikeda
 */
class Main {

  constructor() {
    // 初期設定
    this.stageCalcInside = new createjs.Stage('canvasWave');

    // パーティクルサンプルを作成
    const waveShape = new WaveShape();
    this.stageCalcInside.addChild(waveShape);

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
    // 波の表現を更新
    this.stageCalcInside.update();
  }

  /**
   * リサイズイベント
   */
  handleResize() {
    this.stageCalcInside.canvas.width = innerWidth;
    this.stageCalcInside.canvas.height = innerHeight;
  }
}
