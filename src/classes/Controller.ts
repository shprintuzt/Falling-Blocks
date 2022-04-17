import { Board } from "./Board";
import { Direction, PieceOp } from "./CurrentPiece";

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
            this._board.doGameOverCallbacks()
        } else {
            this._board.updateBoard()
            this._playing = true
            this._score = 0
            this._totalErasedRowNum = 0
        }
    }

    addGameOverCallback = (callback: () => void) => {
        this._board.addGameOverCallback(callback)
    }

    drop = () => {
        const res = this._board.drop()
        if (!res) {
            this._board.doGameOverCallbacks()
        } else {
            this._board.updateBoard();
        }
    }

    moveDown = () => {
        const doRes = this._board.do(PieceOp.Move, Direction.Down);
        this._board.updateBoard();
        if (!doRes) {
            this._board.eraceFilledRow()
            const res = this._board.newCurrentPiece(null);
            if (!res) {
                this._board.doGameOverCallbacks();
            } else {
                this._board.updateBoard();
            }
        }
    }

    moveLeft = () => {
        const doRes = this._board.do(PieceOp.Move, Direction.Left);
        this._board.updateBoard();
        if (!doRes) {
            this._board.eraceFilledRow()
            const res = this._board.newCurrentPiece(null);
            if (!res) {
                this._board.doGameOverCallbacks()
            } else {
                this._board.updateBoard();
            }
        }
    }

    moveRight = () => {
        const doRes = this._board.do(PieceOp.Move, Direction.Right);
        this._board.updateBoard();
        if (!doRes) {
            this._board.eraceFilledRow()
            const res = this._board.newCurrentPiece(null);
            if (!res) {
                this._board.doGameOverCallbacks()
            } else {
                this._board.updateBoard();
            }
        }
    }

    rotateLeft = () => {
        const doRes = this._board.do(PieceOp.Rotate, Direction.Left);
        this._board.updateBoard();
        if (!doRes) {
            this._board.eraceFilledRow()
            const res = this._board.newCurrentPiece(null);
            if (!res) {
                this._board.doGameOverCallbacks()
            } else {
                this._board.updateBoard();
            }
        }
    }

    rotateRight = () => {
        const doRes = this._board.do(PieceOp.Rotate, Direction.Right);
        this._board.updateBoard();
        if (!doRes) {
            this._board.eraceFilledRow()
            const res = this._board.newCurrentPiece(null);
            if (!res) {
                this._board.doGameOverCallbacks()
            } else {
                this._board.updateBoard();
            }
        }
    }

}