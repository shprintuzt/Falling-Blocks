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

export const getPieceShapeDegree0 = (piece: PieceType) => {
    const currentPiece = new CurrentPiece(piece, 1, 1, 0);
    return getPieceShape(currentPiece)
}

export const getPieceShape = (piece: CurrentPiece): any[] => {
    const pieceOffset = PieceOffsets[piece.type][piece.degree].slice()
    const pieceShape = pieceOffset.map((value: {x: number, y: number}) => {
        return {x: piece.x + value.x, y: piece.y + value.y}
    })
    return pieceShape
}

const PieceOffsets: {
    [key in PieceType]: {
        [key: number]:  {x: number, y: number}[]
    }
} = {
    [Piece.O]: {
        [0]: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 0, y: -1},
            {x: 1, y: -1},
        ],
        [90]: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 0, y: -1},
            {x: 1, y: -1},
        ],
        [180]: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 0, y: -1},
            {x: 1, y: -1},
        ],
        [270]: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 0, y: -1},
            {x: 1, y: -1},
        ],
    },
    [Piece.I]: {
        [0]: [
            {x: -1, y: 0},
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 2, y: 0},
        ],
        [90]: [
            {x: 0, y: 0},
            {x: 0, y: -1},
            {x: 0, y: -2},
            {x: 0, y: -3},
        ],
        [180]: [
            {x: -1, y: 0},
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 2, y: 0},
        ],
        [270]: [
            {x: 0, y: 0},
            {x: 0, y: -1},
            {x: 0, y: -2},
            {x: 0, y: -3},
        ],
    },
    [Piece.Z]: {
        [0]: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 1, y: -1},
            {x: 2, y: -1},
        ],
        [90]: [
            {x: 1, y: 0},
            {x: 0, y: -1},
            {x: 1, y: -1},
            {x: 0, y: -2},
        ],
        [180]: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 1, y: -1},
            {x: 2, y: -1},
        ],
        [270]: [
            {x: 1, y: 0},
            {x: 0, y: -1},
            {x: 1, y: -1},
            {x: 0, y: -2},
        ],
    },
    [Piece.S]: {
        [0]: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: -1, y: -1},
            {x: 0, y: -1},
        ],
        [90]: [
            {x: 0, y: 0},
            {x: 0, y: -1},
            {x: 1, y: -1},
            {x: 1, y: -2},
        ],
        [180]: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: -1, y: -1},
            {x: 0, y: -1},
        ],
        [270]: [
            {x: 0, y: 0},
            {x: 0, y: -1},
            {x: 1, y: -1},
            {x: 1, y: -2},
        ],
    },
    [Piece.L]: {
        [0]: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 2, y: 0},
            {x: 0, y: -1}
        ],
        [90]: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 1, y: -1},
            {x: 1, y: -2},
        ],
        [180]: [
            {x: 1, y: 0},
            {x: -1, y: -1},
            {x: 0, y: -1},
            {x: 1, y: -1},
        ],
        [270]: [
            {x: 0, y: 0},
            {x: 0, y: -1},
            {x: 0, y: -2},
            {x: 1, y: -2},
        ],
    },
    [Piece.LR]: {
        [0]: [
            {x: -1, y: 0},
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 1, y: -1},
        ],
        [90]: [
            {x: 1, y: 0},
            {x: 1, y: -1},
            {x: 0, y: -2},
            {x: 1, y: -2},
        ],
        [180]: [
            {x: 0, y: 0},
            {x: 0, y: -1},
            {x: 1, y: -1},
            {x: 2, y: -1},
        ],
        [270]: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 0, y: -1},
            {x: 0, y: -2},
        ],
    },
    [Piece.T]: {
        [0]: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 2, y: 0},
            {x: 1, y: -1},
        ],
        [90]: [
            {x: 1, y: 0},
            {x: 0, y: -1},
            {x: 1, y: -1},
            {x: 1, y: -2},
        ],
        [180]: [
            {x: 1, y: 0},
            {x: 0, y: -1},
            {x: 1, y: -1},
            {x: 2, y: -1},
        ],
        [270]: [
            {x: 0, y: 0},
            {x: 0, y: -1},
            {x: 1, y: -1},
            {x: 0, y: -2},
        ],
    },
}
