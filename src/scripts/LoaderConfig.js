export let LoaderConfig = {
    win_mp3: require("../sounds/win.mp3"),
    win_wav: require("../sounds/win.wav"),
    lose_mp3: require("../sounds/lose.mp3"),
    lose_wav: require("../sounds/lose.wav"),
    theme_mp3: require("../sounds/theme.mp3"),
    theme_wav: require("../sounds/theme.wav"),
    click_mp3: require("../sounds/click.mp3"),
    click_wav: require("../sounds/click.wav"),
    coins_mp3: require("../sounds/coins.mp3"),
    coins_wav: require("../sounds/coins.wav"),
    congratulations_mp3: require("../sounds/congratulations.mp3"),
    congratulations_wav: require("../sounds/congratulations.wav"),
    angelic_choir_mp3: require("../sounds/angelic_choir.mp3"),
    angelic_choir_wav: require("../sounds/angelic_choir.wav"),
    bg: require("../sprites/bg.png"),
    play_now: require("../sprites/play_now.png"),
    bonus: require("../sprites/bonus.png"),
    bonus_banknote: require("../sprites/bonus_banknote.png"),
    rays_bg: require("../sprites/rays_bg.png"),
};

for (let i = 1; i <= 9; i++) {
    if (i <= 5) {
        LoaderConfig[`chest_${i}`] = require(`../sprites/win/${i}.png`);
    } else {
        LoaderConfig[`chestLose_${i}`] = require(`../sprites/lose/${i}.png`);
        LoaderConfig[`chestWin_${i}`] = require(`../sprites/win/${i}.png`);
    }
    LoaderConfig[`goldCoin_${i}`] = require(`../sprites/gold_coin/${i}.png`);
}

for (let i = 1; i <= 18; i++) {
    LoaderConfig[`goldBar_${i}`] = require(`../sprites/gold_bar/${i}.png`);
}