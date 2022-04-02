import { CurrentPiece } from "./CurrentPiece";

export const Piece = {
    O: 0,
    I: 1,
    Z: 2,
    S: 3,
    L: 4,
    LR: 5,
    T: 6,
} as const;

export type PieceType = typeof Piece[keyof typeof Piece];

export const getPieceShape = (currentPiece: CurrentPiece) => {
    let x = currentPiece.x;
    let y = currentPiece.y;
    let piece = currentPiece.type;
    let degree = currentPiece.degree;
    switch (piece) {
        case Piece.O:
            return [
                {x: x, y: y},
                {x: x + 1, y: y},
                {x: x, y: y - 1},
                {x: x + 1, y: y - 1}]
        case Piece.I:
            return [
                {x: x - 1, y: y},
                {x: x, y: y},
                {x: x + 1, y: y},
                {x: x + 2, y: y}]
        case Piece.Z:
            return [
                {x: x, y: y},
                {x: x + 1, y: y},
                {x: x + 1, y: y - 1},
                {x: x + 2, y: y - 1}]
        case Piece.S:
            return [
                {x: x, y: y},
                {x: x + 1, y: y},
                {x: x - 1, y: y - 1},
                {x: x, y: y - 1}]
        case Piece.L:
            return [
                {x: x, y: y},
                {x: x + 1, y: y},
                {x: x + 2, y: y},
                {x: x, y: y - 1}]
        case Piece.LR:
            return [
                {x: x - 1, y: y},
                {x: x, y: y},
                {x: x + 1, y: y},
                {x: x + 1, y: y - 1}]
        case Piece.T:
            return [
                {x: x, y: y},
                {x: x + 1, y: y},
                {x: x + 2, y: y},
                {x: x + 1, y: y - 1}]
        default:
            return []
    }
}