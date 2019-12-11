import Field from "../models/Field";

interface IPosition {
    x: number,
    y: number
}

export default class FieldView extends Phaser.GameObjects.Sprite {
    private _model: Field = null;
    private _position: IPosition = { x: 0, y: 0 };

    constructor(scene: Phaser.Scene, model: Field) {
        super(scene, 0, 0, "spritesheet", "closed");
        this._model = model;
        this._init();
        this._create();
    }

    private get _offset(): IPosition {
        return {
            x: (this.scene.cameras.main.width - this._model.board.cols * this.width) / 2,
            y: (this.scene.cameras.main.height - this._model.board.rows * this.height) / 2
        }
    }

    private _init(): void {
        const offset = this._offset;
        this.x = this._position.x = offset.x + this.width * this._model.col + this.width / 2;
        this.y = this._position.y = offset.y + this.height * this._model.row + this.height / 2;
    }

    private _create(): void {
        this.scene.add.existing(this);
        this.setOrigin(0.5);
    }
}
