import * as PIXI from "pixi.js";
import {Howl, Howler} from 'howler';
import TWEEN from "@tweenjs/tween.js";
import { Globals } from "./Globals";
import { ChestGridConfig } from "./ChestGridConfig";
import { Chest } from "./Chest";

export class ChestGrid {
    constructor() {
        this.container = new PIXI.Container();
        this.container.x = document.body.clientWidth / 2;
        this.container.y = document.body.clientHeight / 3;
        this.container.sortableChildren = true;
        this.createChests();
    }

    createChests(){
        this.pieces = [];

        let ids = ChestGridConfig.pieces.map(field => field.id);

        ChestGridConfig.pieces.forEach(field => {
            const random = Math.floor(Math.random() * ids.length);
            const id = ids[random];
            ids = ids.filter(item => item !== id);

            const piece = new Chest(id, field, this.container);
            piece.on('dragend', () => this.onPieceDragEnd(piece));

            this.container.addChild(piece.sprite);
            this.pieces.push(piece);
        });

        for (let i = 0; i < this.container.children.length; i++) {
            const piece = this.container.children[i];
    
            const tween = new TWEEN.Tween(this.container);
            tween.to({ 
                y: document.body.clientHeight / 2,
            }, 625);
            tween.delay(425);
            tween.easing(TWEEN.Easing.Quadratic.InOut);
            tween.start();
        }
    }

    onPieceDragEnd(piece) {
        piece.reset();
    }

    checkPieces(){
        let correct_count = 0;
        for (let i = 0; i < this.container.children.length; i++) {
            const piece = this.container.children[i];
    
            if (piece.y === ChestGridConfig.pieces[piece.correctId-1].y && piece.x === ChestGridConfig.pieces[piece.correctId-1].x) {
                correct_count++;
                if (correct_count >= this.container.children.length) {
                    Globals.resources.sounds.win.play();
                    this.puzzleDone();
                }
            }
        }
    }

    puzzleDone(){
        for (let i = 0; i < this.container.children.length; i++) {
            const piece = this.container.children[i];

            const tween = new TWEEN.Tween(piece);
            let pos = { x: 0, y: 0};
            if (piece.x < 0) {
                pos.x = piece.x + ChestGridConfig.gap
            }
            if (piece.x > 0) {
                pos.x = piece.x - ChestGridConfig.gap
            }
            if (piece.y < 0) {
                pos.y = piece.y + ChestGridConfig.gap
            }
            if (piece.y > 0) {
                pos.y = piece.y - ChestGridConfig.gap
            }
            tween.to({ 
                x: pos.x,
                y: pos.y,
            }, 325);
            tween.easing(TWEEN.Easing.Back.Out);
            tween.start();
        }
    }
}