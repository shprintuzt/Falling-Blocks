import { Board } from "./Board";
import { Direction, PieceOp } from "./CurrentPiece";
import { Piece } from "./PieceType";

export const Mode = {
    None: 0,
    Normal: 1,
    Erasing: 2,
} as const;

export type ModeType = typeof Mode[keyof typeof Mode];


export class Controller {
    _board: Board;
    _playing: boolean;
    _score: number;
    _totalErasedRowNum: number;
    _mode: ModeType;
    _gameOverCallbacks: {(): void;}[] = []
    _updateBoardCallbacks: {(): void;}[] = []
    _rowErasedCallbacks: {(rowNum: number): void;}[] = []

    constructor() {
        this._playing = false;
        this._score = 0;
        this._totalErasedRowNum = 0;
        this._mode = Mode.None;
        this._board = new Board(10, 30);
    }

    get board() {return this._board;}
    get playing() {return this._playing;}
    get score() {return this._score;}
    get totalErasedRowNum() {return this._totalErasedRowNum;}
    get mode() {return this._mode}

    startNormal = () => {
        this._mode = Mode.Normal;
        this._board.clearBoard(10, 30);
        this.start()
    }

    startErasing = () => {
        this._mode = Mode.Erasing;
        this._board.clearBoard(10, 30)
        this._board.putBlocksRandomly(20)
        this.start()
    }

    start = () => {
        const res = this._board.newCurrentPiece(null);
        if (!res) {
            console.log('error');
            return;
        }

        this._board.updateBoard();
        this.doUpdateBoardCallbacks();
        this._playing = true
        this._score = 0
        this._totalErasedRowNum = 0
    }

    addGameOverCallback = (callback: () => void) => {
        this._gameOverCallbacks.push(callback)
    }

    doGameOverCallbacks = () => {
        for (const callback of this._gameOverCallbacks) {
            callback()
        }
    }

    addUpdateBoardCallback = (callback: () => void): void => {
        this._updateBoardCallbacks.push(callback)
    }

    doUpdateBoardCallbacks = (): void => {
        for (const callback of this._updateBoardCallbacks) {
            callback()
        }
    }

    addRowErasedCallback = (callback: (rowNum: number) => void): void => {
        this._board.addRowErasedCallback(callback);
    }

    doRowErasedCallbacks = (rowNum: number): void => {
        this._board.doRowErasedCallbacks(rowNum);
    }

    drop = (random = true) => {
        this._board.drop();
        this._board.updateBoard();
        this.doUpdateBoardCallbacks();
        const rowNum = this._board.eraseFilledRow();
        this.doRowErasedCallbacks(rowNum);
        const nextPiece = random ? null : Piece.O;
        const res = this._board.newCurrentPiece(nextPiece);

        if (!res) {
            this.doGameOverCallbacks()
        } else {
            this._board.updateBoard();
            this.doUpdateBoardCallbacks();
        }
    }

    moveDown = () => {
        const doRes = this._board.do(PieceOp.Move, Direction.Down);
        this._board.updateBoard();
        this.doUpdateBoardCallbacks();
        if (!doRes) {
            const rowNum = this._board.eraseFilledRow();
            this.doRowErasedCallbacks(rowNum);
            const res = this._board.newCurrentPiece(null);
            if (!res) {
                this.doGameOverCallbacks();
            } else {
                this._board.updateBoard();
                this.doUpdateBoardCallbacks();
            }
        }
    }

    moveLeft = () => {
        const doRes = this._board.do(PieceOp.Move, Direction.Left);
        this._board.updateBoard();
        this.doUpdateBoardCallbacks();
        if (!doRes) {
            const rowNum = this._board.eraseFilledRow();
            this.doRowErasedCallbacks(rowNum);
            const res = this._board.newCurrentPiece(null);
            if (!res) {
                this.doGameOverCallbacks()
            } else {
                this._board.updateBoard();
                this.doUpdateBoardCallbacks();
            }
        }
    }

    moveRight = () => {
        const doRes = this._board.do(PieceOp.Move, Direction.Right);
        this._board.updateBoard();
        this.doUpdateBoardCallbacks();
        if (!doRes) {
            const rowNum = this._board.eraseFilledRow();
            this.doRowErasedCallbacks(rowNum);
            const res = this._board.newCurrentPiece(null);
            if (!res) {
                this.doGameOverCallbacks()
            } else {
                this._board.updateBoard();
                this.doUpdateBoardCallbacks();
            }
        }
    }

    rotateLeft = () => {
        const doRes = this._board.do(PieceOp.Rotate, Direction.Left);
        this._board.updateBoard();
        this.doUpdateBoardCallbacks();
        if (!doRes) {
            const rowNum = this._board.eraseFilledRow();
            this.doRowErasedCallbacks(rowNum);
            const res = this._board.newCurrentPiece(null);
            if (!res) {
                this.doGameOverCallbacks()
            } else {
                this._board.updateBoard();
                this.doUpdateBoardCallbacks();
            }
        }
    }

    rotateRight = () => {
        const doRes = this._board.do(PieceOp.Rotate, Direction.Right);
        this._board.updateBoard();
        this.doUpdateBoardCallbacks();
        if (!doRes) {
            const rowNum = this._board.eraseFilledRow();
            this.doRowErasedCallbacks(rowNum);
            const res = this._board.newCurrentPiece(null);
            if (!res) {
                this.doGameOverCallbacks()
            } else {
                this._board.updateBoard();
                this.doUpdateBoardCallbacks();
            }
        }
    }

}