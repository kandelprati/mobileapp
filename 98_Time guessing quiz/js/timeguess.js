"use strict";

const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

// 🔊 サウンドファイルを読み込む（ファイル名に注意）
const soundStart = new Audio("sound/start.mp3");
const soundStop1 = new Audio("sound/stop1_long.mp3");
const soundStop2 = new Audio("sound/stop2_long.mp3");
const soundReset = new Audio("sound/reset.mp3");

let startTime;
let timeoutid;
let stopTime = 0;

function stopAllSounds() {
  const sounds = [soundStart, soundStop1, soundStop2, soundReset];
  sounds.forEach(s => {
    s.pause();
    s.currentTime = 0;
  });
}

// 初期状態
setButtonStateInitial();

////////////////////////
// Startボタンクリック
////////////////////////
start.addEventListener("click", function () {
  setButtonStateRunning();
  stopAllSounds(); // 他の音を停止

  startTime = Date.now();
  countUp();
  soundStart.play();
}, false);

////////////////////////
// Stopボタンクリック
////////////////////////
stop.addEventListener("click", function () {
  setButtonStateStopped();
  clearTimeout(timeoutid);
  stopAllSounds(); // 他の音を停止

  stopTime += Date.now() - startTime;
  const elapsedSec = Math.floor(stopTime / 1000);

  if (elapsedSec === 10) {
    soundStop2.play();
    showFireworks();
  } else {
    soundStop1.play();
    hideFireworks();
  }
}, false);

////////////////////////
// Resetボタンクリック
////////////////////////
reset.addEventListener("click", function () {
  setButtonStateInitial();
  stopAllSounds(); // 他の音を停止
  soundReset.play();

  timer.textContent = "00:00.000";
  stopTime = 0;

  // 背景をリセット
  document.body.style.backgroundImage = "";
  document.body.style.backgroundColor = "";
}, false);

////////////////////////
// カウントアップ関数
////////////////////////
function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  timer.textContent = `${m}:${s}.${ms}`;

  timeoutid = setTimeout(countUp, 10);
}

function showFireworks() {
  document.body.style.backgroundImage = "url('img/fireworks.gif')";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center center";
  document.body.style.backgroundColor = "transparent";
}

function hideFireworks() {
  document.body.style.backgroundImage = "";
  document.body.style.backgroundColor = "";
}

////////////////////////
// ボタン制御関数
////////////////////////
function setButtonStateInitial() {
  start.classList.remove("js-inactive");
  stop.classList.add("js-inactive");
  reset.classList.add("js-inactive");
  start.classList.remove("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.add("js-unclickable");
}

function setButtonStateRunning() {
  timer.classList.add("timer-fontColor_hidden");
  start.classList.add("js-inactive");
  stop.classList.remove("js-inactive");
  reset.classList.add("js-inactive");
  start.classList.add("js-unclickable");
  stop.classList.remove("js-unclickable");
  reset.classList.add("js-unclickable");
}

function setButtonStateStopped() {
  timer.classList.remove("timer-fontColor_hidden");
  timer.classList.add("timer_appear");
  start.classList.add("js-inactive");
  stop.classList.add("js-inactive");
  reset.classList.remove("js-inactive");
  start.classList.add("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.remove("js-unclickable");
}
