import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { Globals } from "./Globals";
import { ChestGrid } from "./ChestGrid";

export class MainScene {
    constructor() {
        this.container = new PIXI.Container();
        this.createBackground();
        this.createInitChest();
        this.createPlayNowButton();
        this.addSounds();
    }

    createBackground() {
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
        this.playNowBtn.width = this.playNowBtn.width * .5;
        this.playNowBtn.height = this.playNowBtn.height * .5;
        this.playNowBtn.x = document.body.clientWidth / 2;
        this.playNowBtn.y = document.body.clientHeight * .825;
        this.playNowBtn.interactive = true;
        this.container.addChild(this.playNowBtn);

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

    createInitChest(){
        this.initChest = new PIXI.Sprite(Globals.resources["chestWin_9"].texture);

        this.initChest.width *= 1.25;
        this.initChest.height *= 1.25;

        this.initChest.x = document.body.clientWidth / 2;
        this.initChest.y = document.body.clientHeight * .35;

        this.initChest.anchor.set(0.5);

        this.container.addChild(this.initChest);
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
            const grid = new ChestGrid();
            this.container.addChild(grid.container);
        });
    }

    addSounds() {
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
            theme: new Howl({
                src: [Globals.resources.theme_mp3.url, Globals.resources.theme_wav.url],
                html5: true,
                autoplay: true,
                loop: true,
                volume: 0.2,
            }),
        };
    }
}