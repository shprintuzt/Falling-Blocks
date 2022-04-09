import { CurrentPiece, Direction, DirectionType, PieceOp, PieceOpType } from './CurrentPiece';
import { getPieceShape, getRandomPiece, Piece, PieceType } from './PieceType'

export const Cell = {
    Empty: false,
    Filled: true,
} as const;

export type CellKindType = typeof Cell[keyof typeof Cell];

export class Board {
    _board: boolean[][];
    _currentPiece: CurrentPiece;
    _updateBoardCallbacks: {(): void;}[] = []
    _gameOverCallbacks: {(): void;}[] = []
    _rowErasedCallbacks: {(rowNum: number): void;}[] = []
   
    constructor(width: number, height: number) {
        this._board = new Array(width);
        this._currentPiece = new CurrentPiece(Piece.O, width / 2 - 1, height - 1)
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

    clearBoard = (width: number, height: number): void => {
        for (let x = 0; x < width; ++x) {
            this._board[x] = new Array(height);
            for (let y = 0; y < height; ++y) {
                this._board[x][y] = false;
            }
        }
    }

    putBlock = (x: number, y: number): void => {
        this._board[x][y] = true
    }

    isFilled = (x: number, y: number): boolean => {
        return this._board[x][y];
    }

    fillRow = (y: number): void => {
        for (let x = 0; x < this.width; ++x) {
            this._board[x][y] = true;
        }
    }

    newCurrentPiece = (piece: PieceType) => {
        this._currentPiece.reset(piece, this.width / 2 - 1, this.height - 1);
        const pieceShape = getPieceShape(this.currentPiece);
        for (const pos of pieceShape) {
            if (this._board[pos.x][pos.y]) {
                this.doGameOverCallbacks()
            }
        }
    }

    updateBoard = () => {
        const pieceShape = getPieceShape(this.currentPiece)
        for (const pos of pieceShape) {
            this._board[pos.x][pos.y] = true;
        }
        this.doUpdateBoardCallbacks()
    }

    eraseCurrentPiece = () => {
        const pieceShape = getPieceShape(this.currentPiece)
        for (const pos of pieceShape) {
            this._board[pos.x][pos.y] = false;
        }
    }

    do = (op: PieceOpType, direction: DirectionType, random = true): void => {
        this.eraseCurrentPiece();
        const _canDo = this.canDo(op, direction);
        if (_canDo) {
            this.currentPiece.do(op, direction);
        }
        this.updateBoard();

        // piece position is fixed
        if (!_canDo && op == PieceOp.Move && direction == Direction.Down) {
            this.eraceFilledRow()
            const nextPiece = random ? getRandomPiece() : Piece.O
            this.newCurrentPiece(nextPiece);
            this.updateBoard();
        }
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
            if (this._board[pos.x][pos.y]) return false;
        }
        return true;
    }

    drop = (random = true): void => {
        this.eraseCurrentPiece();
        while (this.canDo(PieceOp.Move, Direction.Down)) {
            this.currentPiece.do(PieceOp.Move, Direction.Down);
        }
        this.updateBoard()

        // piece position is fixed
        this.eraceFilledRow()
        const nextPiece = random ? getRandomPiece() : Piece.O
        this.newCurrentPiece(nextPiece);
        this.updateBoard();
    }

    addUpdateBoardCallback = (callback: () => void): void => {
        this._updateBoardCallbacks.push(callback)
    }

    doUpdateBoardCallbacks = (): void => {
        for (const callback of this._updateBoardCallbacks) {
            callback()
        }
    }

    addGameOverCallback = (callback: () => void): void => {
        this._gameOverCallbacks.push(callback)
    }

    doGameOverCallbacks = (): void => {
        for (const callback of this._gameOverCallbacks) {
            callback()
        }
    }

    addRowErasedCallback = (callback: (rowNum: number) => void): void => {
        this._rowErasedCallbacks.push(callback)
    }

    doRowErasedCallbacks = (rowNum: number): void => {
        for (const callback of this._rowErasedCallbacks) {
            callback(rowNum)
        }
    }

    eraceFilledRow = (): void => {
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
                if (offset > 0) this._board[x][y] = false;
            }
        }

        this.doRowErasedCallbacks(filledRowNum)
    }

    isRowFilled = (y: number): boolean => {
        for (let x = 0; x < this.width; ++x) {
            if (!this._board[x][y]) return false;
        }
        return true;
    }

}