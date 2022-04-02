import { CurrentPiece } from './CurrentPiece';
import { getPieceShape, Piece, PieceType } from './PieceType'

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
        let pieceShape = getPieceShape(this.currentPiece)
        for (const pos of pieceShape) {
            this._board[pos.x][pos.y] = true;
        }
    }

    removeCurrentPiece = () => {
        let pieceShape = getPieceShape(this.currentPiece)
        for (const pos of pieceShape) {
            this._board[pos.x][pos.y] = false;
        }
    }

    rotateRight = () => {
        this.removeCurrentPiece()
        this.currentPiece.rotateRight()
        this.updateBoard()
    }

    rotateLeft = () => {
        this.removeCurrentPiece()
        this.currentPiece.rotateLeft()
        this.updateBoard()
    }

    moveRight = () => {
        this.removeCurrentPiece()
        this.currentPiece.moveRight()
        this.updateBoard()
    }

    moveDown = () => {
        this.removeCurrentPiece()
        this.currentPiece.moveDown()
        this.updateBoard()
    }

    moveLeft = () => {
        this.removeCurrentPiece()
        this.currentPiece.moveLeft()
        this.updateBoard()
    }

}