"use strict";

window.addEventListener("DOMContentLoaded", function () {
    // ページ本体が読み込まれたタイミングで表示
    // ヘッダーのテキストエフェクト
    $("header").textillate({
        loop: false, // ループのオンオフ
        minDisplayTime: 2000, // テキストが置き換えられるまでの表示時間
        initialDelay: 2000, // 遅延時間
        autoStart: true, // アニメーションを自動的にスタート
        in: { // フェードインのエフェクトの詳細設定
            effect: "fadeInLeftBig", // エフェクトの名前(animate.css参照)
            delayScale: 1.5, // 遅延時間の指数
            delay: 50, // 文字ごとの遅延時間
            sync: false, // trueはアニメーションをすべての文字に同時に適用
            shuffle: true // trueは文字を順番にではなく、ランダムに
        }
    });
    // おみくじボタン(id="btn1") ボヤァと表示させる
    $(function () {
        ScrollReveal().reveal("#btn1", { duration: 9000 });
    });
    setTimeout(
        function(){
    let popMessage = "いらっしゃい、おみくじ引いてって！";
    window.alert(popMessage);
        },
        "5000");
}, false);

// おみくじボタンの処理
const btn1 = document.getElementById("btn1");
addEventListener("click",
    function(){
    btn1.style.color = 0;
    // let n = Math.floor(Math.random() * 3);

    // switch (n) {
    //     case 0:
    //         btn1.textContent = "GO TO HELL";
    //         btn1.style.color = "#ff0000";
    //         btn1.style.fontSize = "30px";
    //         break;
    //     case 1:
    //         btn1.textContent = "HEAVEN";
    //         btn1.style.color = "#d4bbe2";
    //         btn1.style.fontSize = "20px";
    //         break;
    //     case 2:
    //         btn1.textContent = "GET LIFE...";
    //         btn1.style.color = "#261e1c";
    //         btn1.style.fontSize = "20px";
    //         break;
    // }
    // snowfall stop

    let resultText = ["大吉!!!!!", "吉!!!!", "中吉!!!", "小吉!!", "末吉!", "凶。。"];
    let resutColour = ["#ff0000", "#c71585", "#ff1493", "#ff89b4", "#ff8c00", "#1e90ff"];
    let resutlFontsize = ["55px", "50p", "45px", "40px", "35px", "30px"];
    let resultMaxspeed = [10, 10, 8, 5, 5, 5];
    let resultMaxsize = [30, 30, 20, 15, 20, 20];
    let resultImg = [
        "img/star.png",
        "img/sakura_hanabira.png",
        "img/sakura.png",
        "img/snowflakes.png",
        "img/leaf.png",
        "img/snowflakes.png"

    ];
    let n = Math.floor(Math.random() * resultText.length);
    btn1.textContent = resultText[n];
    btn1.style.color = resutColour[n];
    btn1.style.fontSize = resutlFontsize[n];
    btn1.style.opacity = 1;

    $(document).snowfall("clear");
    $(document).ready(function () {
        $(document).snowfall({
            maxSpeed: resultMaxspeed[n],
            minSpeed: 1, // 最小速度
            maxSize: resultMaxsize[n], // 最大サイズ
            minSize: 1, // 最小サイズ
            image: resultImg[n]
        });
    });
    btn1.style.opacity = 1;

}, false
);

