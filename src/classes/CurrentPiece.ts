import { PieceType } from './PieceType'

export const Direction = {
    Right: 0,
    Left: 1,
    Down: 2,
} as const;

export type DirectionType = typeof Direction[keyof typeof Direction];

export class CurrentPiece {
    _type: PieceType;
    _degree: number;
    _x: number;
    _y: number;

    constructor(type: PieceType, x: number, y: number, degree = 0) {
        this._type = type;
        this._degree = degree;
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

    rotate = (direction: DirectionType): void => {
        switch (direction) {
            case Direction.Right:
                this._degree = (this._degree + 90) % 360
                return;
            case Direction.Left:
                this._degree = (this._degree + 270) % 360
                return;
            default:
                console.error('invalid direction for rotate');
                return;
        }
    }

    move = (direction: DirectionType): void => {
        switch (direction) {
            case Direction.Right:
                this._x += 1;
                return;
            case Direction.Left:
                this._x -= 1;
                return;
            case Direction.Down:
                this._y -= 1;
                return;
            default:
                console.error('invalid direction for move');
        }
    }

    reset = (piece: PieceType, x: number, y: number) => {
        this._type = piece;
        this.x = x;
        this.y = y;
    }
    
}