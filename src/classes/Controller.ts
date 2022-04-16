import { Board } from "./Board";
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

    constructor() {
        this._board = new Board(10, 30);
        this._playing = false;
        this._score = 0;
        this._totalErasedRowNum = 0;
        this._mode = Mode.None;
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
        this._playing = true;
        this._mode = Mode.Erasing;
        this._board.clearBoard(10, 30)
        this._board.putBlocksRandomly(20)
        this.start()
    }

    start = () => {
        this.board.newCurrentPiece(Piece.O);
        this._board.updateBoard()
        this._playing = true
        this._score = 0
        this._totalErasedRowNum = 0
    }

}