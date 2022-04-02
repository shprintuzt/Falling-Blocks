import { Piece } from '../Piece';
import { CurrentPiece } from '../CurrentPiece';

describe('Piece test', () => {
    test('create O piece', () => {
        let oPiece = new Piece('O');
        expect(oPiece.type).toEqual('O');
    });
    test('create current piece', () => {
        let currentPiece = new CurrentPiece('O')
        expect(currentPiece.degree).toEqual(0)
        expect(currentPiece.y).toEqual(0)
    })
    test('rotate O current piece', () => {
        let currentPiece = new CurrentPiece('O');
        currentPiece.rotateRight();
        expect(currentPiece.degree).toEqual(90);
        currentPiece.rotateLeft();
        currentPiece.rotateLeft();
        expect(currentPiece.degree).toEqual(270);
    });
});
