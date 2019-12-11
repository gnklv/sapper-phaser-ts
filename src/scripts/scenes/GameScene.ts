import Board from "../models/Board";

const Rows: number = 8;
const Cols: number = 8;
const Bombs: number = 8;

export default class GameScene extends Phaser.Scene {
    private _board: Board = null;

    constructor() {
        super("Game");
    }

    public create(): void {
        this._board = new Board(this, Rows, Cols, Bombs);
    }
}
