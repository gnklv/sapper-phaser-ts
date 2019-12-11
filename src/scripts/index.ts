import * as Phaser from "phaser";

import StartScene from "./scenes/StartScene";
import GameScene from "./scenes/GameScene";

new Phaser.Game({
    type: Phaser.AUTO,
    parent: "sapper",
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#ecf0f1",
    scene: [StartScene, GameScene]
});
