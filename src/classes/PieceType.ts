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

export function getRandomPiece() {
    const values = Object.values(Piece);
  
    return values[Math.floor(Math.random() * values.length)];
}

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
            if ([0, 180].includes(degree)) {
                return [
                    {x: x - 1, y: y},
                    {x: x, y: y},
                    {x: x + 1, y: y},
                    {x: x + 2, y: y}]
            } else {
                return [
                    {x: x, y: y},
                    {x: x, y: y - 1},
                    {x: x, y: y - 2},
                    {x: x, y: y - 3}]
            }
        case Piece.Z:
            if ([0, 180].includes(degree)) {
                return [
                    {x: x, y: y},
                    {x: x + 1, y: y},
                    {x: x + 1, y: y - 1},
                    {x: x + 2, y: y - 1}]
            } else {
                return [
                    {x: x + 1, y: y},
                    {x: x, y: y - 1},
                    {x: x + 1, y: y - 1},
                    {x: x + 1, y: y - 2}]
            }
        case Piece.S:
            if ([0, 180].includes(degree)) {
                return [
                    {x: x, y: y},
                    {x: x + 1, y: y},
                    {x: x - 1, y: y - 1},
                    {x: x, y: y - 1}]
            } else {
                return [
                    {x: x, y: y},
                    {x: x, y: y - 1},
                    {x: x + 1, y: y - 1},
                    {x: x + 1, y: y - 2}]
            }
        case Piece.L:
            if (0 == degree) {
                return [
                    {x: x, y: y},
                    {x: x + 1, y: y},
                    {x: x + 2, y: y},
                    {x: x, y: y - 1}]
            } else if (90 == degree) {
                return [
                    {x: x, y: y},
                    {x: x + 1, y: y},
                    {x: x + 1, y: y - 1},
                    {x: x + 1, y: y - 2}]
            } else if (180 == degree) {
                return [
                    {x: x + 1, y: y},
                    {x: x - 1, y: y - 1},
                    {x: x, y: y - 1},
                    {x: x + 1, y: y - 1}]
            } else if (270 == degree) {
                return [
                    {x: x, y: y},
                    {x: x, y: y - 1},
                    {x: x, y: y - 2},
                    {x: x + 1, y: y - 2}]
            }
        case Piece.LR:
            if (0 == degree) {
                return [
                    {x: x - 1, y: y},
                    {x: x, y: y},
                    {x: x + 1, y: y},
                    {x: x + 1, y: y - 1}]
            } else if (90 == degree) {
                return [
                    {x: x + 1, y: y},
                    {x: x + 1, y: y - 1},
                    {x: x, y: y - 2},
                    {x: x + 1, y: y - 2}]
            } else if (180 == degree) {
                return [
                    {x: x, y: y},
                    {x: x, y: y - 1},
                    {x: x + 1, y: y - 1},
                    {x: x + 2, y: y - 1}]
            } else if (270 == degree) {
                return [
                    {x: x, y: y},
                    {x: x + 1, y: y},
                    {x: x, y: y - 1},
                    {x: x, y: y - 2}]
            }
        case Piece.T:
            if (0 == degree) {
                return [
                    {x: x, y: y},
                    {x: x + 1, y: y},
                    {x: x + 2, y: y},
                    {x: x + 1, y: y - 1}]
            } else if (90 == degree) {
                return [
                    {x: x + 1, y: y},
                    {x: x, y: y - 1},
                    {x: x + 1, y: y - 1},
                    {x: x + 1, y: y - 2}]
            } else if (180 == degree) {
                return [
                    {x: x + 1, y: y},
                    {x: x, y: y - 1},
                    {x: x + 1, y: y - 1},
                    {x: x + 2, y: y - 1}]
            } else if (270 == degree) {
                return [
                    {x: x, y: y},
                    {x: x, y: y - 1},
                    {x: x + 1, y: y - 1},
                    {x: x, y: y - 2}]
            }
        default:
            return []
    }
}