import { PieceType } from './PieceType'

export class CurrentPiece {
    _type: PieceType;
    _degree: number;
    _y: number;

    constructor(type: PieceType) {
        this._type = type;
        this._degree = 0;
        this._y = 0;
    }

    get degree() {
        return this._degree;
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