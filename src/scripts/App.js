import * as PIXI from "pixi.js";
import TWEEN from "@tweenjs/tween.js";
import { Loader } from "./Loader";
import { MainScene } from "./MainScene";

export class App {
    run() {
        // create canvas
        this.app = new PIXI.Application({
            resizeTo: window
        });
        document.body.appendChild(this.app.view);

        // load sprites
        this.loader = new Loader(this.app.loader);
        this.loader.preload().then(() => this.start());
    }

    start() {
        this.app.ticker.add(() => {
            TWEEN.update();
        })

        this.scene = new MainScene();
        this.app.stage.addChild(this.scene.container);
    }
}