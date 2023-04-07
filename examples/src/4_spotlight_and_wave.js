// 起動コード
import { drawWave } from "./WaveShape.js";
import { drawSpotLight } from "./SpotLightShape.js";

// ウェーブ風グラフィック用のステージを作成
const canvasWave = document.getElementById("canvasWave");
const contextWave = canvasWave.getContext("2d");

// スポットライト風グラフィック用のステージを作成
const canvasOverlay = document.getElementById("canvasOverlay");
const contextOverlay = canvasOverlay.getContext("2d");

// リサイズイベント
handleResize();
window.addEventListener("resize", () => {
  handleResize();
});

tick();

function tick() {
  requestAnimationFrame(tick);

  // 薄く暗く塗る
  contextWave.fillStyle = `rgba(0, 0, 0, 0.2)`;
  contextWave.fillRect(0, 0, canvasWave.width, canvasWave.height);

  // 波の表現を更新
  drawWave(contextWave, canvasWave.width, canvasWave.height);

  // スポットライト風グラフィックの描画
  contextOverlay.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
  drawSpotLight(contextOverlay, canvasOverlay.width, canvasOverlay.height);

  // 2つのステージを合成する
  contextOverlay.globalCompositeOperation = "lighter";
  contextOverlay.drawImage(canvasWave, 0, 0);
}

function handleResize() {
  // ウェーブ風グラフィック用ステージのりサイズ
  canvasWave.width = innerWidth;
  canvasWave.height = innerHeight;

  // スポットライト風グラフィック用ステージのりサイズ
  canvasOverlay.width = innerWidth;
  canvasOverlay.height = innerHeight;
}
