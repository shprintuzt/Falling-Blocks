import { CurrentPiece, Direction, DirectionType, PieceOp, PieceOpType } from './CurrentPiece';
import { getPieceShape, getRandomPiece, Piece, PieceType } from './PieceType'

export const Cell = {
    Empty: 0,
    Filled: 1,
    Shadow: 2,
    Red: 3,
} as const;

export type CellType = typeof Cell[keyof typeof Cell];

export class Board {
    _board: CellType[][];
    _currentPiece: CurrentPiece;
    _shadow: CurrentPiece;
    _pieceNum: number;
   
    constructor(width: number, height: number) {
        this._board = new Array(width);
        this._currentPiece = new CurrentPiece(Piece.O, width / 2 - 1, height - 1)
        this._shadow = new CurrentPiece(Piece.O, width / 2 - 1, height - 1)
        this._pieceNum = 0;
        this.clearBoard(width, height)
    }

    get width() {
        return this._board.length;
    }

    get height() {
        if (this._board[0] == null) return 0;
        return this._board[0].length;
    }

    get currentPiece() {
        return this._currentPiece
    }

    get pieceNum() {
        return this._pieceNum;
    }

    clearBoard = (width: number, height: number): void => {
        this._pieceNum = 0;
        for (let x = 0; x < width; ++x) {
            this._board[x] = new Array<CellType>(height);
            for (let y = 0; y < height; ++y) {
                this._board[x][y] = Cell.Empty;
            }
        }
    }

    putBlock = (x: number, y: number): void => {
        this._board[x][y] = Cell.Filled;
    }

    putBlocksRandomly = (height: number): void => {
        for (let y = 0; y < height; ++y) {
            const randomNums = this.pickRandomly([...Array(10).keys()], 6)
            for (const x of randomNums) {
                this._board[x][y] = Cell.Red;
            }
        }
    }

    pickRandomly = (array: number[], num: number): number[] => {
        const result = [];
        for (let i = 0; i < num; ++i) {
            const picked = this.getRandomInt(array.length);
            result.push(array[picked]);
            array = array.slice(0, picked).concat(array.slice(picked + 1, array.length));
        }
        return result;
    }

    getRandomInt = (max: number): number => {
        return Math.floor(Math.random() * max);
    }

    getCell = (x: number, y: number): CellType => {
        return this._board[x][y];
    }

    fillRow = (y: number): void => {
        for (let x = 0; x < this.width; ++x) {
            this._board[x][y] = Cell.Filled;
        }
    }

    fillRowRed = (y: number): void => {
        for (let x = 0; x < this.width; ++x) {
            this._board[x][y] = Cell.Red;
        }
    }

    newCurrentPiece = (piece: PieceType | null): boolean => {
        this._pieceNum += 1;
        if (piece == null)
            piece = getRandomPiece();
        this._currentPiece.reset(piece, this.width / 2 - 1, this.height - 1);
        this.updateShadow()

        const pieceShape = getPieceShape(this.currentPiece);
        for (const pos of pieceShape) {
            if (this._board[pos.x][pos.y] != Cell.Empty) {
                return false;
            }
        }

        return true;
    }

    updateBoard = () => {
        const pieceShape = getPieceShape(this.currentPiece)
        for (const pos of pieceShape) {
            this._board[pos.x][pos.y] = Cell.Filled;
        }
        const shadowShape = getPieceShape(this._shadow);
        for (const pos of shadowShape) {
            if (this._board[pos.x][pos.y] != Cell.Filled) {
                this._board[pos.x][pos.y] = Cell.Shadow;
            }
        }
    }

    eraseCurrentPiece = () => {
        const pieceShape = getPieceShape(this.currentPiece)
        for (const pos of pieceShape) {
            this._board[pos.x][pos.y] = Cell.Empty;
        }
    }

    eraseShadow = () => {
        const pieceShape = getPieceShape(this._shadow)
        for (const pos of pieceShape) {
            if (this._board[pos.x][pos.y] == Cell.Shadow)
                this._board[pos.x][pos.y] = Cell.Empty;
        }
    }

    do = (op: PieceOpType, direction: DirectionType, random = true): boolean => {
        this.eraseCurrentPiece();
        const _canDo = this.canDo(op, direction);
        if (_canDo) {
            this.currentPiece.do(op, direction);
            this.updateShadow()
        }

        // piece position is fixed
        if (!_canDo && op == PieceOp.Move && direction == Direction.Down) {
            return false;
        }

        return true;
    }

    canDo = (op: PieceOpType, direction: DirectionType): boolean => {
        const next = new CurrentPiece(
            this.currentPiece.type,
            this.currentPiece.x,
            this.currentPiece.y,
            this.currentPiece.degree)
        next.do(op, direction);
        const nextPieceShape = getPieceShape(next);
        for (const pos of nextPieceShape) {
            if (pos.x < 0 || pos.x >= this.width) return false;
            if (pos.y < 0) return false;
            if (this._board[pos.x][pos.y] == Cell.Filled) return false;
            if (this._board[pos.x][pos.y] == Cell.Red) return false;
        }
        return true;
    }

    drop = (): void => {
        this.eraseCurrentPiece();
        while (this.canDo(PieceOp.Move, Direction.Down)) {
            this.currentPiece.do(PieceOp.Move, Direction.Down);
        }
    }

    updateShadow = (): void => {
        this.eraseShadow();
        const tmpCurrentPiece = CurrentPiece.copy(this._currentPiece)
        while (this.canDo(PieceOp.Move, Direction.Down)) {
            this._currentPiece.do(PieceOp.Move, Direction.Down);
        }
        this._shadow = CurrentPiece.copy(this._currentPiece)
        this._currentPiece = CurrentPiece.copy(tmpCurrentPiece)
    }

    eraseFilledRow = (): number => {
        let filledRowNum = 0;
        const filledRowNums = new Array<number>(this.height);
        for (let y = 0; y < this.height; ++y) {
            filledRowNums[y] = filledRowNum;
            if (this.isRowFilled(y)) filledRowNum += 1;
        }

        for (let y = 0; y < this.height; ++y) {
            for (let x = 0; x < this.width; ++x) {
                const offset = filledRowNums[y];
                this._board[x][y - offset] = this._board[x][y];
                if (offset > 0) this._board[x][y] = Cell.Empty;
            }
        }

        return filledRowNum;
    }

    isRowFilled = (y: number): boolean => {
        for (let x = 0; x < this.width; ++x) {
            if (!this._board[x][y]) return false;
        }
        return true;
    }

    hasRedBlock = (): boolean => {
        for (let x = 0; x < this.width; ++x) {
            for (let y = 0; y < this.height; ++y) {
                if (this._board[x][y] == Cell.Red) return true;
            }
        }
        return false;
    }

    raiseUpRedLine = (random = true) => {
        for (let x = 0; x < this.width; ++x) {
            const cell = this.getCell(x, this.height - 1);
            if (cell == Cell.Filled || cell == Cell.Red) {
                return false;
            }
        }
        for (let y = this.height - 1; y > 0; --y) {
            for (let x = 0; x < this.width; ++x) {
                this._board[x][y] = this._board[x][y - 1];
            }
        }

        for (let x = 0; x < this.width; ++x) {
            this._board[x][0] = Cell.Empty;
        }

        if (random) {
            this.putBlocksRandomly(1);
        } else {
            this.fillRowRed(0);
        }
        return true
    }

}