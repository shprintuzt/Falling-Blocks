import { PieceType } from './PieceType'

export const PieceOp = {
    Rotate: 0,
    Move: 1,
} as const;

export type PieceOpType = typeof PieceOp[keyof typeof PieceOp];

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

    set x(x: number) {
        this._x = x;
    }

    get y() {
        return this._y;
    }

    set y(y: number) {
        this._y = y;
    }

    do = (op: PieceOpType, direction: DirectionType): void => {
        switch (op) {
            case PieceOp.Rotate:
                this.rotate(direction);
                return;
            case PieceOp.Move:
                this.move(direction);
                return;
            default:
                console.error('invalid piece operation');
                return;
        }
    }

    rotate = (direction: DirectionType): void => {
        switch (direction) {
            case Direction.Right:
                this.rotateRight();
                return;
            case Direction.Left:
                this.rotateLeft();
                return;
            default:
                console.error('invalid direction for rotate');
                return;
        }
    }

    rotateRight = (): void => {
        this._degree = (this._degree + 90) % 360
    }

    rotateLeft = (): void => {
        this._degree = (this._degree + 270) % 360
    }

    move = (direction: DirectionType): void => {
        switch (direction) {
            case Direction.Right:
                this.moveRight();
                return;
            case Direction.Left:
                this.moveLeft();
                return;
            case Direction.Down:
                this.moveDown();
                return;
            default:
                console.error('invalid direction for move');
        }
    }

    moveRight = (): void => {
        this._x += 1;
    }

    moveLeft = (): void => {
        this._x -= 1;
    }

    moveDown = (): void => {
        this._y -= 1;
    }

    reset = (piece: PieceType, x: number, y: number) => {
        this._type = piece;
        this.x = x;
        this.y = y;
        this._degree = 0;
    }
    
}