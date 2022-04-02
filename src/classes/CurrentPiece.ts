import { Piece } from './Piece'

export class CurrentPiece extends Piece {
    _degree: number;
    _y: number;

    constructor(type: string) {
        super(type);
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