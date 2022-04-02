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