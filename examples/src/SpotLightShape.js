/**
 * スポットライト風グラフィックの表示クラスです。
 *
 * @param context {CanvasRenderingContext2D} コンテキスト
 * @param w {number} 幅
 * @param h {number} 高さ
 *
 * @author IKEDA Yasunobu
 */
export function drawSpotLight(context, w, h) {
  // -------------------------
  // 1個目の円
  // -------------------------
  const dx = w / 3 + (w / 10) * Math.sin(Date.now() / 4000);
  const dy1 = h / 3;
  const size1 = w / 2;

  drawCircle(context, dx, dy1, size1, "rgba(255, 255, 255, 0.3)");

  // -------------------------
  // 2個目の円
  // -------------------------
  const dx2 = (w * 3) / 4 + (w / 15) * Math.cos(Date.now() / 10000);
  const dy2 = (h * 2) / 3;
  const size2 = w / 3;

  drawCircle(context, dx2, dy2, size2, "rgba(255, 255, 255, 0.1)");
}

/**
 * グラデーションのかかった円を描きます。
 * @param context {CanvasRenderingContext2D} コンテキスト
 * @param dx {number} X座標
 * @param dy {number} Y座標
 * @param size {number}
 * @param color {string}
 */
function drawCircle(context, dx, dy, size, color) {
  // グラデーションの指定
  const gradient = context.createRadialGradient(dx, dy, 0, dx, dy, size);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  // 円を描く
  context.fillStyle = gradient;
  context.beginPath();
  context.arc(dx, dy, size, 0, Math.PI * 2);
  context.closePath();
  context.fill();
}
