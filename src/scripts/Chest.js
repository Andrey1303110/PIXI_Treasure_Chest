import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { ChestGridConfig } from "./ChestGridConfig";
import { Globals } from "./Globals";
import {Howl, Howler} from 'howler';

export class Chest {
    constructor(isWin, bonusWin, field, num) {
        let textureArray = [];

        for (let i = 1; i <= 9; i++) {
            let source;
            if (isWin) {
                source = Globals.resources[`chestWin_${i}`];
            } else {
                source = Globals.resources[`chestLose_${i}`];
            }
            textureArray.push(source.texture);
        };

        this.sprite = new PIXI.AnimatedSprite(textureArray);
        this.sprite.animationSpeed = 1/3;
        this.sprite.loop = false;
        this.sprite.alpha = .85;
        this.sprite.anchor.set(.5);
        
        let ratio = this.sprite.height / this.sprite.width;

        this.sprite.width = ChestGridConfig.chestSize;
        this.sprite.height = this.sprite.width * ratio;

        this.isOpened = false;
        this.isWin = Boolean(isWin);
        this.bonusWin = bonusWin;
        this.field = field;
        this.num = num;
        this.setPosition();
    }

    setInteractive() {
        this.sprite.interactive = true;
        this.sprite.on('pointerover', this.onPointerOver, this);
        this.sprite.on('pointerout', this.onPointerOut, this);
    }
    
    onPointerOver(){
        if (this.isOpened) {
            return;
        }
        Globals.resources.sounds.click.play();
        this.sprite.tint = 0xFFFFFF;
        this.sprite.alpha = 1;
        this.sprite.width *= 1.225;
        this.sprite.height *= 1.225;
    }

    onPointerOut(){
        if (this.isOpened) {
            return;
        }
        this.sprite.alpha = .85;
        this.sprite.width /= 1.225;
        this.sprite.height /= 1.225;
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