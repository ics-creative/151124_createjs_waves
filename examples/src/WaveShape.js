// パーリンノイズを初期化。 libs/perlin.js を読み込んでください。
// ※パーリンノイズはお好みのライブラリをつかってください。
noise.seed(Math.random());

/**
 * ウェーブ風グラフィックの表示クラスです。
 * @param context  {CanvasRenderingContext2D}
 * @param w {number} 幅
 * @param h {number} 高さ
 *
 * @param vertexNum {number} 線自体の個数です。
 * @param maxVertex {number} 線の水平方向の頂点数です。
 * @param debugMode {boolean} デバッグモードとして実行するかの設定です。trueの場合、デバッグ表示が有効になります。
 *
 * @see FrocessingSample by nutsu https://beautifl.net/run/246/
 * @author IKEDA Yasunobu
 */
export function drawWave(context, w, h, vertexNum = 10, maxVertex = 5, debugMode = false) {
  // 曲線を描き直す
  for (let i = 0; i < vertexNum; i++) {
    // デバッグ機能が有効の場合は線を2pxで描く
    const strokeSize = debugMode === true ? 1.0 : 0.05 * i + 0.1; // ゼロ対策(ゼロのときに太さが1pxになるため)

    const timeOffset = i * 0.1;
    const time = Date.now() / 5000;

    // 線のスタイルを設定
    context.beginPath();
    context.strokeStyle = "white";
    context.lineWidth = strokeSize;

    /**
     * @type {number[]}
     */
    const vertexArr = [];
    // 波の次の目標値を計算
    for (let i = 0; i <= vertexNum; i++) {
      // 乱数を取得、-1.0〜+1.0の範囲
      const noiseNum = noise.perlin2(i * 0.2, time + timeOffset);
      // 目標座標を計算。画面の高さに比例
      vertexArr[i] = noiseNum * h * 0.5;
    }
    // 曲線を描くためにXY座標を計算
    const BASE_Y = h / 2; // 基準は画面の中央のY座標
    /**
     * @type {{x:number, y:number}[]}
     */
    const points = [];
    // 画面左端の座標
    points.push({ x: -200, y: BASE_Y });
    for (let i = 0; i <= vertexNum; i++) {
      // 途中座標
      points.push({
        x: (w * (i / vertexNum)) >> 0,
        y: vertexArr[i] + BASE_Y,
      });
    }
    // 画面右端の座標
    points.push({ x: w + 200, y: BASE_Y });
    // 直線情報を曲線にするテクニック
    // 参考 : http://jsdo.it/clockmaker/createjs-curveto
    for (let i = 0; i < points.length; i++) {
      if (i < 2) {
        continue;
      }
      // マウスの軌跡を変数に保存
      const p0x = points[i - 0].x;
      const p0y = points[i - 0].y;
      const p1x = points[i - 1].x;
      const p1y = points[i - 1].y;
      const p2x = points[i - 2].x;
      const p2y = points[i - 2].y;

      // カーブ用の頂点を割り出す
      const curveStartX = (p2x + p1x) / 2;
      const curveStartY = (p2y + p1y) / 2;
      const curveEndX = (p0x + p1x) / 2;
      const curveEndY = (p0y + p1y) / 2;

      // カーブは中間点を結ぶ。マウスの座標は制御点として扱う。
      context.moveTo(curveStartX, curveStartY);
      context.quadraticCurveTo(p1x, p1y, curveEndX, curveEndY);
    }
    context.stroke();

    // デバッグ機能
    // 曲線のもとになっている頂点を可視化
    if (debugMode === true) {
      drawDebugView(context, points);
    }
  }
}

/**
 * デバッグ表示を行います。
 * @param context  {CanvasRenderingContext2D}
 * @param points {{x:number, y:number}[]}
 */
function drawDebugView(context, points) {
  for (let i = 0; i < points.length; i++) {
    // マウスの軌跡を変数に保存
    const p0x = points[i - 0].x;
    const p0y = points[i - 0].y;
    if (i > 0) {
      const p1x = points[i - 1].x;
      const p1y = points[i - 1].y;
      // 線を描く

      context.beginPath();
      context.strokeStyle = "red";
      context.lineWidth = 0.5;
      context.moveTo(p1x, p1y);
      context.lineTo(p0x, p0y);
      context.stroke();
    }

    // 点をプロットする
    context.beginPath();
    context.fillStyle = "red";
    context.arc(p0x, p0y, 3, 0, 2 * Math.PI);
    context.fill();
  }
}
