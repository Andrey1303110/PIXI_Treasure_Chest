import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { ChestGridConfig } from "./ChestGridConfig";
import { Globals } from "./Globals";
import {Howl, Howler} from 'howler';

export class Chest {
    constructor(isWin, bonusWin, field, num) {
        this.sprite = new PIXI.Sprite(Globals.resources['chestLose_1'].texture);
        this.sprite.tint = 0xC9C9C9;
        this.sprite.anchor.set(.5);
        
        let ratio = this.sprite.width / this.sprite.height;

        this.sprite.width = ChestGridConfig.chestSize;
        this.sprite.height = this.sprite.width * ratio;

        this.isOpened = false;
        this.isWin = Boolean(isWin);
        this.bonusWin = bonusWin;
        this.field = field;
        this.num = num;
        this.setPosition();

        this.setInteractive();
    }

    setInteractive() {
        this.sprite.interactive = true;
        this.sprite.on('pointerdown', this.onTouch, this);
        this.sprite.on('pointerover', this.onPointerOver);
        this.sprite.on('pointerout', this.onPointerOut);
    }

    onTouch() {
        if (this.isWin) {
            alert('you win!')
        } else {
            alert('you lose!')
        }
        if (this.bonusWin) {
            alert('Bonus!')
        }
        this.sprite.zIndex = 1;
    }
    
    onPointerOver(){
        Globals.resources.sounds.click.play();
        this.tint = 0xFFFFFF;
        this.width *= 1.225;
        this.height *= 1.225;
    }

    onPointerOut(){
        this.tint = 0xC9C9C9;
        this.width /= 1.225;
        this.height /= 1.225;
    }

    setPosition() {
        const tween = new TWEEN.Tween(this.sprite);
        const delay = this.num * ChestGridConfig.animation.position_duration;
        tween.to({ 
            x: this.field.x,
            y: this.field.y,
        }, ChestGridConfig.animation.init_delay + delay);
        tween.easing(TWEEN.Easing.Exponential.InOut);
        tween.start();
    }
}