import { CurrentPiece } from "../CurrentPiece";
import { getPieceShape, Piece } from "../PieceType";

describe('Piece test', () => {
    test('get piece shape', () => {
        const currentPiece = new CurrentPiece(Piece.I, 4, 29);
        const pieceShape = getPieceShape(currentPiece);

        expect(pieceShape).toEqual([
            {x: 3, y: 29},
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 6, y: 29},
        ])
    })
});
