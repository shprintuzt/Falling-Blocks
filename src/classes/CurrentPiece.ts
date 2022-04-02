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

    get degree() {
        return this._degree;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    rotateRight = (): void => {
        this._degree = (this._degree + 90) % 360
    }
    
    rotateLeft = (): void => {
        this._degree = (this._degree + 270) % 360
    }
    
}