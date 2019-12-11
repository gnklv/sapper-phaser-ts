import Field from "./Field";
import P = Phaser.Input.Keyboard.KeyCodes.P;

export default class Board extends Phaser.Events.EventEmitter {
    private _scene: Phaser.Scene = null;
    private _rows: number = 0;
    private _cols: number = 0;
    private _bombs: number = 0;
    private _fields: Field[] = [];

    constructor(scene: Phaser.Scene, rows: number, cols: number, bombs: number) {
        super();
        this._scene = scene;
        this._rows = rows;
        this._cols = cols;
        this._bombs = bombs;
        this._fields = [];

        this._create();
    }

    public get rows(): number {
        return this._rows;
    }

    public get cols(): number {
        return this._cols;
    }

    public getField(row: number, col: number): Field {
        return this._fields.find(field => field.row === row && field.col === col);
    }

    private _create(): void {
        this._createFields();
        this._createBombs();
        this._createValues();
    }

    private _createFields(): void {
        for (let row = 0; row < this._rows; row++) {
            for (let col = 0; col < this._cols; col++) {
                this._fields.push(new Field(this._scene, this, row, col));
            }
        }
    }

    private _createBombs(): void {
        let count = this._bombs;

        while (count > 0) {
            let field = this._fields[Phaser.Math.Between(0, this._fields.length - 1)];

            if (field.empty) {
                field.setBomb();
                count--;
            }
        }
    }

    private _createValues(): void {
        this._fields.forEach(field => {
            if (field.mined) {
                field.getClosestFields().forEach(item => {
                    if (item.value >= 0) {
                        item.value++;
                    }
                });
            }
        });
    }
}
