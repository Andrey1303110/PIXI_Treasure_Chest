import * as PIXI from "pixi.js";
import {Howl, Howler} from 'howler';
import TWEEN from "@tweenjs/tween.js";
import { Globals } from "./Globals";
import { ChestGridConfig } from "./ChestGridConfig";
import { Chest } from "./Chest";

export class ChestGrid {
    constructor() {
        this.container = new PIXI.Container();
        this.container.x = document.body.clientWidth * .5;
        this.container.y = document.body.clientHeight * .275;
        this.container.sortableChildren = true;
        this.createChests();
    }

    createChests(){
        this.chests = [];

        let bonus_count = 0;
        const bonus_num = Math.round(Math.random() / ChestGridConfig.bonusWinChance);

        ChestGridConfig.chests.forEach(field => {
            const isWin = Math.round(Math.random());
            let isBonus = false;
            
            if (isWin) {
                if (bonus_count < ChestGridConfig.bonusMaxCount) {
                    isBonus = this.generateBonusWin(bonus_num);
                    if (isBonus) {
                        ++bonus_count;
                        console.log("We have bonus chest on screen!\nHe number is: " + (Number(this.chests.length) + 1));
                    }   
                }
            }

            const chest = new Chest(isWin, isBonus, field, this.chests.length);

            chest.sprite.on('pointerdown', () => this.selectChest(chest), this);

            this.container.addChild(chest.sprite);
            this.chests.push(chest);
        });

        this.checkIsHaveWinChest();

        const tween = new TWEEN.Tween(this.container);
        tween.to({ 
            y: document.body.clientHeight / 2,
        }, 725);
        tween.delay(this.chests.length * ChestGridConfig.animation.position_duration);
        tween.easing(TWEEN.Easing.Bounce.Out);
        tween.start();
        tween.onComplete(() => {
            this.chests.forEach(chest => {
                chest.setInteractive()
            });
        });
    }

    generateBonusWin(bonus_num){
        return (bonus_num === (Math.round(Math.random() / ChestGridConfig.bonusWinChance)));
    }

    checkIsHaveWinChest(){
        let count = 0;
        this.chests.forEach(chest => {
            if (chest.isWin) ++count;
        });

        if (!count) {
            const random_num = Math.floor(Math.random() * 6);
            this.chests[random_num].isWin = true;

            const bonus_num = Math.round(Math.random() / ChestGridConfig.bonusWinChance);
            const isBonus = this.generateBonusWin(bonus_num);
            if (isBonus) {
                this.chests[random_num].bonusWin = true;
            }
        }
    }

    selectChest(chest){
        if (chest.isOpened) {
            return;
        }

        chest.isOpened = true;

        const chests = this.chests.filter(elem => elem !== chest);

        chests.forEach(chest => {
            const tween = new TWEEN.Tween(chest.sprite);
            tween.to({ 
                y: document.body.clientHeight * 2,
            }, 725);
            tween.easing(TWEEN.Easing.Bounce.Out);
            tween.start();
        });

        const tween = new TWEEN.Tween(chest.sprite);
        tween.to({
            x: 0,
            y: 0,
        }, 725);
        tween.delay(425);
        tween.easing(TWEEN.Easing.Back.InOut);
        tween.start();
        tween.onComplete(() => {
            const tween2 = new TWEEN.Tween(chest.sprite);
            tween2.to({
                width: chest.sprite.width * 1.75,
                height: chest.sprite.height * 1.75,
            }, Globals.resources.sounds.angelic_choir._duration * 1000);
            tween2.easing(TWEEN.Easing.Linear.None);
            tween2.start();
            
            tween2.onStart(() => Globals.resources.sounds.angelic_choir.play());
            tween2.onComplete(() => { this.startOpenAnimation(chest) });
        });
    }

    startOpenAnimation(chest) {
        if (chest.isWin) {
            Globals.resources.sounds.win.play();
        } else {
            Globals.resources.sounds.lose.play();
        }

        chest.sprite.play();

        setTimeout(() => {
            const time_to_start = Globals.scenes.main.createFinalScreen(chest);
            this.returnChests(chest, time_to_start);
        }, 1500);
    }

    returnChests(openedChest, delay = 0) {
        const chests = this.chests.filter(elem => elem !== openedChest);

        const tween = new TWEEN.Tween(openedChest.sprite);
        tween.to({
            width: openedChest.sprite.width / 1.75,
            height: openedChest.sprite.height / 1.75,
            x: openedChest.field.x,
            y: openedChest.field.y,
            alpha: .5
        }, 450);
        tween.delay(delay);
        tween.easing(TWEEN.Easing.Linear.None);
        tween.start();
        tween.onComplete(() => this.checkChests());

        chests.forEach(chest => {
            const tween = new TWEEN.Tween(chest.sprite);
            tween.to({
                x: chest.field.x,
                y: chest.field.y,
            }, 725);
            tween.delay(450 + delay);
            tween.easing(TWEEN.Easing.Linear.None);
            tween.start();
        });
    }

    checkChests(){
        const closedChests = this.chests.filter(chest => !chest.isOpened);
        
        if (!closedChests.length) {
            this.gameDone();
        }
    }

    gameDone(){
        const duration = 1500;
        this.chests.forEach(chest => {
            const tween = new TWEEN.Tween(chest.sprite);
            tween.to({
                alpha: 0,
            }, duration);
            tween.delay(duration);
            tween.easing(TWEEN.Easing.Linear.None);
            tween.start();
        });

        setTimeout(() => {
            this.container.destroy();
            Globals.scenes.main.init();
        }, duration * 2);
    }
}