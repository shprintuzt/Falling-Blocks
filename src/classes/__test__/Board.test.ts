import { Board } from '../Board';
import { Piece } from '../Piece';

describe('Board test', () => {
    test('create 10 x 30 empty board', () => {
        let board = new Board(10, 30)
        expect(board.width).toEqual(10);
        expect(board.height).toEqual(30);
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                expect(board.isEmpty(x, y)).toBe(false)
            }
        }
    });
    test('fill the 11th horizontal line', () => {
        let board = new Board(10, 30)
        board.fillHorizontalLine(10)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (y == 10) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else {
                    expect(board.isEmpty(x, y)).toBe(false)
                }
            }
        }
    });
    test('add a current piece', () => {
        let board = new Board(10, 30)
        let piece = new Piece('O')
        board.updateCurrentPiece(piece)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 4 && y == 28
                    || x == 5 && y == 28) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else {
                    expect(board.isEmpty(x, y)).toBe(false)
                }
            }
        }
    });
});
