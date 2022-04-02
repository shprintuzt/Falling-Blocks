import { CurrentPiece } from './CurrentPiece';
import { Piece, PieceType } from './PieceType'

export class Board {
    _board: boolean[][];
    _currentPiece: CurrentPiece;
   
    constructor(width: number, height: number) {
        this._board = new Array(width);
        this._currentPiece = new CurrentPiece(Piece.O)
        for (let x = 0; x < width; ++x) {
            this._board[x] = new Array(height);
            for (let y = 0; y < height; ++y) {
                this._board[x][y] = false;
            }
        }
    }

    get width() {
        return this._board.length;
    }

    get height() {
        if (this._board[0] == null) return 0;
        return this._board[0].length;
    }

    isEmpty = (x: number, y: number): boolean => {
        return this._board[x][y];
    }

    fillHorizontalLine = (y: number): void => {
        for (let x = 0; x < this.width; ++x) {
            this._board[x][y] = true;
        }
    }

    updateCurrentPiece = (piece: PieceType) => {
        this._currentPiece = new CurrentPiece(piece);
        this._board[4][29] = true;
        this._board[5][29] = true;
        this._board[4][28] = true;
        this._board[5][28] = true;
    }

}