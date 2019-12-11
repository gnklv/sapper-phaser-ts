import Board from "../models/Board";
import Field from "../models/Field";
import GameSceneView from "../views/GameSceneView";

const Rows: number = 8;
const Cols: number = 8;
const Bombs: number = 8;

export default class GameScene extends Phaser.Scene {
    private _board: Board = null;
    private _flags: number = 0;
    private _view: GameSceneView = null;

    constructor() {
        super("Game");
        document.querySelector("canvas").oncontextmenu = event => event.preventDefault();
    }

    public create(): void {
        this._flags = Bombs;
        this._board = new Board(this, Rows, Cols, Bombs);
        this._board.on("left-click", this._onFieldClickLeft, this);
        this._board.on("right-click", this._onFieldClickRight, this);
        this._view = new GameSceneView(this);
        this._view.render({ flags: this._flags });
    }

    private _onFieldClickLeft(field: Field): void {
        if (field.closed) {
            field.open();

            if (field.mined) {
                field.exploded = true;
                this._onGameOver(false);
            } else if (field.empty) {
                this._board.openClosestFields(field);
            }
        } else if (field.opened) {
            if (this._board.completed) {
                this._onGameOver(true);
            }
        }
    }

    private _onFieldClickRight(field: Field): void {
        if (field.closed && this._flags > 0) {
            field.addFlag();
        } else if (field.marked) {
            field.removeFlag();
        }

        this._flags = Bombs - this._board.countMarked;
        this._view.render({ flags: this._flags });
    }

    private _onGameOver(status: boolean): void {
        this._board.off("left-click", this._onFieldClickLeft, this);
        this._board.off("right-click", this._onFieldClickRight, this);
        this._board.open();
        this._view.render({ status });
    }
}
