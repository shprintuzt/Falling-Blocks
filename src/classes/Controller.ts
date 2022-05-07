import { Board, Cell } from "./Board";
import { Direction, DirectionType, PieceOp, PieceOpType } from "./CurrentPiece";
import { getPieceShape, getRandomPiece, Piece, PieceType } from "./PieceType";

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
    _pieceNum: number;
    _mode: ModeType;
    _nextPieces: PieceType[];
    _holdedPiece: PieceType | null
    _gameOverCallbacks: {(): void;}[] = []
    _updateBoardCallbacks: {(): void;}[] = []
    _rowErasedCallbacks: {(rowNum: number): void;}[] = []

    constructor() {
        this._playing = false;
        this._score = 0;
        this._totalErasedRowNum = 0;
        this._pieceNum = 0;
        this._mode = Mode.None;
        this._nextPieces = [];
        this._holdedPiece = null;
        this._board = new Board(10, 30);
    }

    get board() {return this._board;}
    get playing() {return this._playing;}
    get score() {return this._score;}
    get totalErasedRowNum() {return this._totalErasedRowNum;}
    get pieceNum() {return this._pieceNum;}
    get mode() {return this._mode}
    get holdedPiece() {return this._holdedPiece;}

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
        this.clearNextPieces()
        for (let i = 0; i < 4; ++i) {
            this.addNextPiece()
        }

        const nextPiece = this.popNextPiece()
        const res = this._board.newCurrentPiece(nextPiece);
        if (!res) {
            console.log('error');
            return;
        }

        this._board.updateBoard();
        this.doUpdateBoardCallbacks();
        this._playing = true
        this._score = 0
        this._totalErasedRowNum = 0
        this._pieceNum = 0;
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

    clearNextPieces = () => {
        this._nextPieces = []
    }

    addNextPiece = (piece: PieceType | null = null) => {
        if (piece == null)
            piece = getRandomPiece();
            
        this._nextPieces.push(piece)
    }

    popNextPiece = (): PieceType => {
        if (this._nextPieces.length < 1) {
            console.log('error')
        }

        const nextPiece = this._nextPieces.shift() as PieceType;
        return nextPiece;
    }

    hold = (random = true): void => {
        this.board.eraseCurrentPiece();

        if (this._holdedPiece == null) {
            this._holdedPiece = this.board.currentPiece._type;

            const addedPiece = random ? null : Piece.O;
            this.addNextPiece(addedPiece);
            const nextPiece = this.popNextPiece();
            const res = this._board.newCurrentPiece(nextPiece);
            if (!res) {
                this.doGameOverCallbacks();
            } else {
                this._board.updateBoard();
                this.doUpdateBoardCallbacks();
            }
            return;
        }

        const tmpPiece = this._board.currentPiece._type;
        this._board._currentPiece._type = this.holdedPiece as PieceType;
        const pieceShape = getPieceShape(this._board._currentPiece);
        for (const pos of pieceShape) {
            if (pos.x < 0 || pos.x >= this._board.width
                || pos.y < 0 || pos.y >= this._board.height) {
                this._board._currentPiece._type = tmpPiece;
                return;
            }
            const cellType = this._board.getCell(pos.x, pos.y);
            if (cellType == Cell.Filled || cellType == Cell.Red) {
                this._board._currentPiece._type = tmpPiece;
                return;
            }
        }
        this._holdedPiece = tmpPiece;
        this._board.updateShadow();
        this._board.updateBoard();
        this.doUpdateBoardCallbacks();
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
        this._pieceNum += 1;
        const rowNum = this._board.eraseFilledRow();
        this.doRowErasedCallbacks(rowNum);

        // if (this.mode == Mode.Erasing && this._pieceNum % 30 == 0) {
        //     const raiseUpRes = this._board.raiseUpRedLine();
        //     if (!raiseUpRes) {
        //         this.doGameOverCallbacks();
        //         return;
        //     }
        // }

        const addedPiece = random ? null : Piece.O;
        this.addNextPiece(addedPiece);
        const nextPiece = this.popNextPiece();
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