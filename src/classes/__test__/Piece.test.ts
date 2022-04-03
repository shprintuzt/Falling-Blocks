import { Piece } from '../PieceType';
import { CurrentPiece, Direction } from '../CurrentPiece';

describe('Piece test', () => {
    test('create current piece', () => {
        let currentPiece = new CurrentPiece(Piece.O, 0, 0)
        expect(currentPiece.degree).toEqual(0)
        expect(currentPiece.x).toEqual(0)
        expect(currentPiece.y).toEqual(0)
    })
    test('rotate O current piece', () => {
        let currentPiece = new CurrentPiece(Piece.O, 0, 0);
        currentPiece.rotate(Direction.Right);
        expect(currentPiece.degree).toEqual(90);
        currentPiece.rotateLeft();
        currentPiece.rotateLeft();
        expect(currentPiece.degree).toEqual(270);
    });
    test('move piece', () => {
        let currentPiece = new CurrentPiece(Piece.O, 5, 9);
        currentPiece.moveRight()
        expect(currentPiece.x).toEqual(6);
        expect(currentPiece.y).toEqual(9);
        currentPiece.moveDown()
        expect(currentPiece.x).toEqual(6);
        expect(currentPiece.y).toEqual(8);
        currentPiece.moveLeft()
        expect(currentPiece.x).toEqual(5);
        expect(currentPiece.y).toEqual(8);
    })
});
