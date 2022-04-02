import { Piece } from '../PieceType';
import { CurrentPiece } from '../CurrentPiece';

describe('Piece test', () => {
    test('create current piece', () => {
        let currentPiece = new CurrentPiece(Piece.O, 0, 0)
        expect(currentPiece.degree).toEqual(0)
        expect(currentPiece.x).toEqual(0)
        expect(currentPiece.y).toEqual(0)
    })
    test('rotate O current piece', () => {
        let currentPiece = new CurrentPiece(Piece.O, 0, 0);
        currentPiece.rotateRight();
        expect(currentPiece.degree).toEqual(90);
        currentPiece.rotateLeft();
        currentPiece.rotateLeft();
        expect(currentPiece.degree).toEqual(270);
    });
});