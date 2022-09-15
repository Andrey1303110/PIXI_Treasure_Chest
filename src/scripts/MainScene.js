import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { Globals } from "./Globals";
import { ChestGrid } from "./ChestGrid";
import { WinObject } from "./WinObject";

export class MainScene {
    constructor() {
        this.container = new PIXI.Container();

        this.init();
    }

    init() {
        if (this.bonus_banknote) {
            this.container.removeChild(this.bonus_banknote);
            this.bonus_banknote.destroy();
        }
        this.createBackground();
        this.createInitChest();
        this.createPlayNowButton();
        this.addSounds();
    }

    createBackground() {
        if (this.bg) {
            return;
        }

        this.bg = new PIXI.Sprite(Globals.resources["bg"].texture);

        this.bg.width = Math.max(window.innerWidth, window.innerHeight);
        this.bg.height = Math.max(window.innerWidth, window.innerHeight);

        this.bg.x = document.body.clientWidth / 2;
        this.bg.y = document.body.clientHeight / 2;

        this.bg.anchor.set(0.5);

        this.container.addChild(this.bg);
    }

    createPlayNowButton() {
        this.playNowBtn = new PIXI.Sprite(Globals.resources["play_now"].texture);
        this.playNowBtn.anchor.set(0.5);

        this.playNowBtn.width = document.body.clientHeight / 2.75;
        this.playNowBtn.height = this.playNowBtn._texture.orig.height / this.playNowBtn._texture.orig.width * this.playNowBtn.width;

        this.playNowBtn.x = document.body.clientWidth / 2;
        this.playNowBtn.y = document.body.clientHeight + this.playNowBtn.height;
        this.playNowBtn.interactive = true;
        this.container.addChild(this.playNowBtn);

        const initTween = new TWEEN.Tween(this.playNowBtn);
        initTween.to({
            y: document.body.clientHeight * .825
        }, 475);
        initTween.easing(TWEEN.Easing.Quadratic.InOut);
        initTween.start();

        const tween = new TWEEN.Tween(this.playNowBtn);
        tween.to({
            width: this.playNowBtn.width * 1.175,
            height: this.playNowBtn.height * 1.175,
        }, 475);
        tween.repeat(Infinity);
        tween.yoyo(true);
        tween.easing(TWEEN.Easing.Quadratic.InOut);
        tween.start();

        this.playNowBtn.on('pointerdown', this.addChestGrid, this);
    }

    createInitChest() {
        this.initChest = new PIXI.Sprite(Globals.resources["chestWin_9"].texture);

        this.initChest.width = document.body.clientHeight / 2.45;
        this.initChest.height = this.initChest._texture.orig.height / this.initChest._texture.orig.width * this.initChest.width;

        this.initChest.x = document.body.clientWidth / 2;
        this.initChest.y = -this.initChest.height;

        this.initChest.anchor.set(0.5);

        this.container.addChild(this.initChest);

        const tween = new TWEEN.Tween(this.initChest);
        tween.to({
            y: document.body.clientHeight * .335
        }, 575);
        tween.easing(TWEEN.Easing.Quadratic.InOut);
        tween.start();
    }

    addChestGrid() {
        const tween1 = new TWEEN.Tween(this.playNowBtn);
        tween1.to({
            y: document.body.clientHeight + this.playNowBtn.height,
        }, 625);
        tween1.easing(TWEEN.Easing.Quadratic.InOut);
        tween1.start();

        const tween2 = new TWEEN.Tween(this.initChest);
        tween2.to({
            y: -this.initChest.height,
        }, 625);
        tween2.easing(TWEEN.Easing.Quadratic.InOut);
        tween2.start();
        tween2.onComplete(() => {
            this.container.removeChild(this.initChest);
            this.container.removeChild(this.playNowBtn);

            const grid = new ChestGrid();
            this.container.addChild(grid.container);
        });
    }

    createFinalScreen(chest) {
        if (chest.isWin) {
            let max_duration = 0,
                min_duration = Infinity,
                objects_num = 150,
                sound = 'coins';
            if (chest.bonusWin) {
                objects_num = 50;
                sound = 'congratulations';
                this.createBonusScreen();
            }
            for (let i = 0; i < objects_num; i++) {
                let object = new WinObject(chest);

                object.sprite.x = object.params.x;
                object.sprite.y = -object.sprite.height;

                this.container.addChild(object.sprite);

                const tween = new TWEEN.Tween(object.sprite);
                tween.to({
                    y: document.body.clientHeight + object.sprite.height,
                }, object.params.duration);
                tween.delay(object.params.delay);
                tween.easing(TWEEN.Easing.Linear.None);
                tween.start();
                tween.onComplete(() => { this.container.removeChild(object.sprite) });

                max_duration = Math.max(max_duration, object.params.duration + object.params.delay);
                min_duration = Math.min(min_duration, object.params.duration + object.params.delay);
            }

            setTimeout(() => {
                Globals.resources.sounds[sound].play();
            }, min_duration * .8 * (chest.bonusWin ? 0 : 1));

            return max_duration;
        }
    }

    createBonusScreen() {
        this.createBonusBG();
        this.createBonusLogo();
    }

    createBonusBG() {
        const rays_bg = new PIXI.Sprite(Globals.resources["rays_bg"].texture);

        rays_bg.width = Math.max(window.innerWidth, window.innerHeight) * 1.33;
        rays_bg.height = Math.max(window.innerWidth, window.innerHeight) * 1.33;

        rays_bg.x = document.body.clientWidth / 2;
        rays_bg.y = document.body.clientHeight / 2;

        rays_bg.anchor.set(0.5);

        this.container.addChild(rays_bg);

        const tween = new TWEEN.Tween(rays_bg);
        tween.to({
            angle: 25,
            width: rays_bg.width * 1.5,
            heigth: rays_bg.heigth * 1.5,
        }, 5000);
        tween.easing(TWEEN.Easing.Linear.None);
        tween.start();
        tween.onComplete(() => { this.alphaTween(rays_bg, 1500) });
    }

    alphaTween(object, duration) {
        const tween = new TWEEN.Tween(object);
        tween.to({
            alpha: 0,
        }, duration);
        tween.easing(TWEEN.Easing.Linear.None);
        tween.start();
        tween.onComplete(() => {
            this.container.removeChild(object);
            object.destroy();
        });
    }

    setPositionForBanknote(object, duration, delay) {
        const tween = new TWEEN.Tween(object);
        tween.to({
            x: document.body.clientWidth - object.width / 4 / 2 - document.body.clientWidth * .015,
            y: object.height / 4 / 2 + document.body.clientWidth * .015,
            width: object.width / 4,
            height: object.height / 4,
            angle: 360,
            alpha: .85
        }, duration);
        tween.delay(delay);
        tween.easing(TWEEN.Easing.Linear.None);
        tween.start();
    }

    createBonusLogo() {
        const bonus = new PIXI.Sprite(Globals.resources["bonus"].texture);

        bonus.width /= 10;
        bonus.height /= 10;

        bonus.x = document.body.clientWidth / 2;
        bonus.y = document.body.clientHeight / 2;

        bonus.anchor.set(0.5);

        this.container.addChild(bonus);

        const tween = new TWEEN.Tween(bonus);
        tween.to({
            width: bonus.width * 10,
            height: bonus.height * 10,
            alpha: 0,
        }, 2000);
        tween.easing(TWEEN.Easing.Linear.None);
        tween.start();
        tween.onComplete(() => {
            this.container.removeChild(bonus);
            bonus.destroy();
            this.createBonusBanknote();
        });
    }

    createBonusBanknote() {
        const bonus_banknote = new PIXI.Sprite(Globals.resources["bonus_banknote"].texture);

        bonus_banknote.width = bonus_banknote._texture.orig.width / 20;
        bonus_banknote.height = bonus_banknote._texture.orig.height / 20;

        bonus_banknote.x = document.body.clientWidth / 2;
        bonus_banknote.y = document.body.clientHeight / 2;

        bonus_banknote.anchor.set(0.5);

        this.container.addChild(bonus_banknote);

        const tween = new TWEEN.Tween(bonus_banknote);

        tween.to({
            width: Math.min(document.body.clientWidth, document.body.clientHeight),
            height: Math.min(document.body.clientWidth, document.body.clientHeight) / bonus_banknote._texture.orig.width * bonus_banknote._texture.orig.height,
        }, 2500);
        tween.easing(TWEEN.Easing.Linear.None);
        tween.start();
        tween.onComplete(() => {
            this.setPositionForBanknote(bonus_banknote, 1250, 500);
        });

        this.bonus_banknote = bonus_banknote;
    }

    addSounds() {
        if (Globals.resources.sounds) {
            return;
        }

        Globals.resources.sounds = {
            click: new Howl({
                src: [Globals.resources.click_mp3.url, Globals.resources.click_wav.url],
                html5: true
            }),
            lose: new Howl({
                src: [Globals.resources.lose_mp3.url, Globals.resources.lose_wav.url],
                html5: true,
                rate: 2
            }),
            win: new Howl({
                src: [Globals.resources.win_mp3.url, Globals.resources.win_wav.url],
                html5: true
            }),
            angelic_choir: new Howl({
                src: [Globals.resources.angelic_choir_mp3.url, Globals.resources.angelic_choir_wav.url],
                html5: true
            }),
            coins: new Howl({
                src: [Globals.resources.coins_mp3.url, Globals.resources.coins_wav.url],
                html5: true
            }),
            congratulations: new Howl({
                src: [Globals.resources.congratulations_mp3.url, Globals.resources.congratulations_wav.url],
                html5: true
            }),
            theme: new Howl({
                src: [Globals.resources.theme_mp3.url, Globals.resources.theme_wav.url],
                html5: true,
                autoplay: true,
                loop: true,
                volume: 0.15,
            }),
        };
    }
}