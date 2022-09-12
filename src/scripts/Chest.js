import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { Globals } from "./Globals";
import {Howl, Howler} from 'howler';

export class Chest extends PIXI.utils.EventEmitter {
    constructor(id, field) {
        super();
        this.sprite = new PIXI.Sprite(Globals.resources['chestLose_1'].texture);
        this.sprite.anchor.set(.5);
        this.sprite.width = document.body.clientWidth / 7;
        this.sprite.height = document.body.clientWidth / 7;
        this.field = field;
        this.sprite.correctId = id;
        this.reset();

        this.setInteractive();
    }

    setInteractive() {
        this.sprite.interactive = true;
        this.sprite.on('pointerdown', this.onTouchStart, this);
        this.sprite.on('pointerup', this.onTouchEnd, this);
        this.sprite.on('pointermove', this.onTouchMove, this);
        this.sprite.on('pointerover', this.onPointerOver);
        this.sprite.on('pointerout', this.onPointerOut);
    }

    onTouchStart(event) {
        this.sprite.zIndex = 1;
        this.touchPosition = {
            x: event.data.global.x,
            y: event.data.global.y,
        };

        this.dragging = true;
        Globals.resources.sounds.click.play();
    }

    onTouchEnd() {
        this.dragging = false;
        this.emit('dragend');
    }

    onTouchMove(event) {
        if (!this.dragging) {
            return;
        }

        const currentPosition = {
            x: event.data.global.x,
            y: event.data.global.y,
        }

        const offsetX = currentPosition.x - this.touchPosition.x;
        const offsetY = currentPosition.y - this.touchPosition.y;

        this.sprite.x = this.field.x + offsetX;
        this.sprite.y = this.field.y + offsetY;
    }
    
    onPointerOver(){
        this.width *= 1.25;
        this.height *= 1.25;
    }

    onPointerOut(){
        this.width /= 1.25;
        this.height /= 1.25;
    }

    reset() {
        const tween = new TWEEN.Tween(this.sprite);
        tween.to({ 
            x: this.field.x,
            y: this.field.y,
        }, 325);
        tween.onStart(() => {
            this.sprite.zIndex = 1;
        });
        tween.onComplete(() => {
            this.sprite.zIndex = 0;
        });
        tween.easing(TWEEN.Easing.Back.Out);
        tween.start();
    }
}