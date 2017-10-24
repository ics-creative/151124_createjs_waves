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
    // ウェーブ風グラフィック用のステージを作成
    this.stageCalcInside = new createjs.Stage('canvasWave');
    this.stageCalcInside.autoClear = false;

    // ウェーブ風グラフィックを作成
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
  }

  /**
   * リサイズイベント
   */
  handleResize() {
    // ウェーブ風グラフィック用ステージのりサイズ
    this.stageCalcInside.canvas.width = innerWidth;
    this.stageCalcInside.canvas.height = innerHeight;
  }
}
