import { drawWave } from "./WaveShape.js";

// 初期設定
const canvas = document.getElementById("canvasWave");
const context = canvas.getContext("2d");

// リサイズイベント
handleResize();
window.addEventListener("resize", () => {
  handleResize();
});

// Tickerを作成
tick();

/**
 * エンターフレームイベント
 */
function tick() {
  // クリアにする
  context.clearRect(0, 0, canvas.width, canvas.height);

  // 波の表現を更新
  drawWave(context, canvas.width, canvas.height, 1, 4, true);

  requestAnimationFrame(tick);
}

/**
 * リサイズイベント
 */
function handleResize() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
}
