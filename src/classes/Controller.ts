import { Board } from "./Board";
import { Direction, DirectionType, PieceOp, PieceOpType } from "./CurrentPiece";
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
        this._rowErasedCallbacks.push(callback);
    }

    doRowErasedCallbacks = (rowNum: number): void => {
        for (const callback of this._rowErasedCallbacks) {
            callback(rowNum);
        }
    }

    drop = (random = true) => {
        this._board.drop();

        this._board.updateBoard();
        this.doUpdateBoardCallbacks();

        this.postFixProcess(random)
    }

    do = (op: PieceOpType, direction: DirectionType, random = true) => {
        const doRes = this._board.do(op, direction);
        this._board.updateBoard();
        this.doUpdateBoardCallbacks();

        if (doRes) return;

        // if do return false, piece position is fixed

        this.postFixProcess(random)
    }

    postFixProcess = (random = true) => {
        const rowNum = this._board.eraseFilledRow();
        this.doRowErasedCallbacks(rowNum);
        const nextPiece = random ? null : Piece.O;
        const res = this._board.newCurrentPiece(nextPiece);
        if (!res) {
            this.doGameOverCallbacks();
        } else {
            this._board.updateBoard();
            this.doUpdateBoardCallbacks();
        }
    }

    moveDown = () => {
        this.do(PieceOp.Move, Direction.Down);
    }

    moveLeft = () => {
        this.do(PieceOp.Move, Direction.Left);
    }

    moveRight = () => {
        this.do(PieceOp.Move, Direction.Right);
    }

    rotateLeft = () => {
        this.do(PieceOp.Rotate, Direction.Left);
    }

    rotateRight = () => {
        this.do(PieceOp.Rotate, Direction.Right);
    }

}