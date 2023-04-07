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

handleTick();

/**
 * エンターフレームイベント
 */
function handleTick() {
  // クリアにする
  context.clearRect(0, 0, canvas.width, canvas.height);

  // 波の表現を更新
  drawWave(context, canvas.width, canvas.height);

  requestAnimationFrame(handleTick);
}

/**
 * リサイズイベント
 */
function handleResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
