import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class WinObject {
    constructor(data) {
        this.isBonus = data.bonusWin;
        this.init();
    }
    
    init() {
        this.generateParams();
        this.getTextures(this.isBonus);
        this.createObject();
    }

    generateParams() {
        this.params = {
            x: document.body.clientWidth * Math.random(),
            duration: (Math.random() * 1750) + 500,
            delay: (Math.random() * 3000) + 250,
        }
    }

    getTextures(isBonus) {
        let count_frames, 
            name,
            textureArray = [];
        
        if (isBonus) {
            count_frames = 18;
            name = 'goldBar';
        } else {
            count_frames = 9;
            name = 'goldCoin';
        }

        for (let i = 1; i <= count_frames; i++) {
            let source = Globals.resources[`${name}_${i}`];
            textureArray.push(source.texture);
        };
        this.textureArray = textureArray;
    }

    createObject() {
        this.sprite = new PIXI.AnimatedSprite(this.textureArray);
        this.sprite.anchor.set(0.5);

        const size_cof = (Math.random() * (150 - 50) + 50)/100;
        const sprite_speed = Math.random() * (1/3 - 1/7) + 1/7;
        //const sprite_speed = (Math.random() * (1000/2.5 - 1000/7) + 1000/7)/1000;

        this.sprite.width *= size_cof;
        this.sprite.height *= size_cof;

        this.sprite.animationSpeed = sprite_speed;
        this.sprite.play();
    }
}