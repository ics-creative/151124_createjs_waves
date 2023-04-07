import { drawSpotLight } from "./SpotLightShape.js";

// 初期設定
const canvas = document.getElementById("canvasOverlay");
const context = canvas.getContext("2d");

// Tickerを作成
tick();

/**
 * エンターフレームイベント
 */
function tick() {
  // 薄く暗く塗る
  context.fillStyle = `rgba(0, 0, 0, 0.2)`;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // スポットライト風グラフィックの描画
  drawSpotLight(context, canvas.width, canvas.height);

  requestAnimationFrame(tick);
}

// リサイズイベント
handleResize();
window.addEventListener("resize", () => {
  handleResize();
});
/**
 * リサイズイベント
 */
function handleResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
