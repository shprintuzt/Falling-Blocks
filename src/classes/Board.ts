import { CurrentPiece } from './CurrentPiece';
import { Piece, PieceType } from './PieceType'

export class Board {
    _board: boolean[][];
    _currentPiece: CurrentPiece;
   
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

    clearBoard = (width: number, height: number) => {
        for (let x = 0; x < width; ++x) {
            this._board[x] = new Array(height);
            for (let y = 0; y < height; ++y) {
                this._board[x][y] = false;
            }
        }
    }

    isEmpty = (x: number, y: number): boolean => {
        return this._board[x][y];
    }

    fillHorizontalLine = (y: number): void => {
        for (let x = 0; x < this.width; ++x) {
            this._board[x][y] = true;
        }
    }

    newCurrentPiece = (piece: PieceType) => {
        this._currentPiece.reset(piece, this.width / 2 - 1, this.height - 1);
    }

    updateBoard = () => {
        let x = this.currentPiece.x;
        let y = this.currentPiece.y;
        switch (this.currentPiece.type) {
            case Piece.O:
                this._board[x][y] = true;
                this._board[x + 1][y] = true;
                this._board[x][y - 1] = true;
                this._board[x + 1][y - 1] = true;
                break;
            case Piece.I:
                this._board[x - 1][y] = true;
                this._board[x][y] = true;
                this._board[x + 1][y] = true;
                this._board[x + 2][y] = true;
                break;
            case Piece.Z:
                this._board[x][y] = true;
                this._board[x + 1][y] = true;
                this._board[x + 1][y - 1] = true;
                this._board[x + 2][y - 1] = true;
                break;
            case Piece.S:
                this._board[x][y] = true;
                this._board[x + 1][y] = true;
                this._board[x - 1][y - 1] = true;
                this._board[x][y - 1] = true;
                break;
            case Piece.L:
                this._board[x][y] = true;
                this._board[x + 1][y] = true;
                this._board[x + 2][y] = true;
                this._board[x][y - 1] = true;
                break;
            case Piece.LR:
                this._board[x - 1][y] = true;
                this._board[x][y] = true;
                this._board[x + 1][y] = true;
                this._board[x + 1][y - 1] = true;
                break;
            case Piece.T:
                this._board[x][y] = true;
                this._board[x + 1][y] = true;
                this._board[x + 2][y] = true;
                this._board[x + 1][y - 1] = true;
                break;
            // case Piece.O:
            //     console.log('Oranges are $0.59 a pound.');
            //     break;
            // case Piece.O:
            //     console.log('Oranges are $0.59 a pound.');
            //     break;
            // case Piece.O:
            //     console.log('Oranges are $0.59 a pound.');
            //     break;
            // case Piece.O:
            //     console.log('Oranges are $0.59 a pound.');
            //     break;
            // case Piece.O:
            //     console.log('Oranges are $0.59 a pound.');
            //     break;
            // case Piece.O:
            //     console.log('Oranges are $0.59 a pound.');
            //     break;
            default:
                console.error('invalid PieceType')
        }
    }

}