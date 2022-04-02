import { PieceType } from './PieceType'

export class CurrentPiece {
    _type: PieceType;
    _degree: number;
    _x: number;
    _y: number;

    constructor(type: PieceType, x: number, y: number) {
        this._type = type;
        this._degree = 0;
        this._x = x;
        this._y = y;
    }

    get type() {
        return this._type;
    }

    get degree() {
        return this._degree;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set x(x: number) {
        this._x = x;
    }

    set y(y: number) {
        this._y = y;
    }

    rotateRight = (): void => {
        this._degree = (this._degree + 90) % 360
    }
    
    rotateLeft = (): void => {
        this._degree = (this._degree + 270) % 360
    }

    reset = (piece: PieceType, x: number, y: number) => {
        this._type = piece;
        this.x = x;
        this.y = y;
    }
    
}