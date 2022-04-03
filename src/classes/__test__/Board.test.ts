import { Board } from '../Board';
import { Direction } from '../CurrentPiece';
import { Piece } from '../PieceType';

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
})
describe('Piece shape test', () => {
    test('update a current piece to O and board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.O)
        expect(board.currentPiece.degree).toBe(0)
        expect(board.currentPiece.x).toBe(10 / 2 - 1)
        expect(board.currentPiece.y).toBe(30 - 1)
        board.updateBoard()
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
    test('update a current piece to I and board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.I)
        board.updateBoard()
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 3 && y == 29
                    || x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 6 && y == 29) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else {
                    expect(board.isEmpty(x, y)).toBe(false)
                }
            }
        }
    });
    test('update a current piece to Z and board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.Z)
        board.updateBoard()
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 5 && y == 28
                    || x == 6 && y == 28) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else {
                    expect(board.isEmpty(x, y)).toBe(false)
                }
            }
        }
    });
    test('update a current piece to S and board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.S)
        board.updateBoard()
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 3 && y == 28
                    || x == 4 && y == 28) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else {
                    expect(board.isEmpty(x, y)).toBe(false)
                }
            }
        }
    });
    test('update a current piece to L and board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.L)
        board.updateBoard()
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 6 && y == 29
                    || x == 4 && y == 28) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else {
                    expect(board.isEmpty(x, y)).toBe(false)
                }
            }
        }
    });
    test('update a current piece to LR and board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.LR)
        board.updateBoard()
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 3 && y == 29
                    || x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 5 && y == 28) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else {
                    expect(board.isEmpty(x, y)).toBe(false)
                }
            }
        }
    });
    test('update a current piece to T and board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.T)
        board.updateBoard()
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 6 && y == 29
                    || x == 5 && y == 28) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else {
                    expect(board.isEmpty(x, y)).toBe(false)
                }
            }
        }
    });
});
describe('Piece rotation', () => {
    test('rotate piece L in empty board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.L)
        board.updateBoard()
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 6 && y == 29
                    || x == 4 && y == 28) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else {
                    expect(board.isEmpty(x, y)).toBe(false)
                }
            }
        }
        board.rotate(Direction.Left)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 29
                    || x == 4 && y == 28
                    || x == 4 && y == 27
                    || x == 5 && y == 27) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else {
                    expect(board.isEmpty(x, y)).toBe(false)
                }
            }
        }
        board.rotate(Direction.Right)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 6 && y == 29
                    || x == 4 && y == 28) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else {
                    expect(board.isEmpty(x, y)).toBe(false)
                }
            }
        }
    })
    test('rotate piece LR in non-empty board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.LR)
        board.putBlock(5, 27)
        board.updateBoard()
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 3 && y == 29
                    || x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 5 && y == 28) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else if (x == 5 && y == 27) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else {
                    expect(board.isEmpty(x, y)).toBe(false)
                }
            }
        }
        board.rotate(Direction.Right)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 3 && y == 29
                    || x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 5 && y == 28) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else if (x == 5 && y == 27) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else {
                    expect(board.isEmpty(x, y)).toBe(false)
                }
            }
        }
        board.rotate(Direction.Left)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 4 && y == 28
                    || x == 4 && y == 27) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else if (x == 5 && y == 27) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else {
                    expect(board.isEmpty(x, y)).toBe(false)
                }
            }
        }
    })
});
describe('Piece move', () => {
    test('move piece T in empty board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.T)
        board.updateBoard()
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 6 && y == 29
                    || x == 5 && y == 28) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else {
                    expect(board.isEmpty(x, y)).toBe(false)
                }
            }
        }
        board.move(Direction.Right)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 5 && y == 29
                    || x == 6 && y == 29
                    || x == 7 && y == 29
                    || x == 6 && y == 28) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else {
                    expect(board.isEmpty(x, y)).toBe(false)
                }
            }
        }
        board.move(Direction.Down)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 5 && y == 28
                    || x == 6 && y == 28
                    || x == 7 && y == 28
                    || x == 6 && y == 27) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else {
                    expect(board.isEmpty(x, y)).toBe(false)
                }
            }
        }
        board.move(Direction.Left)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 28
                    || x == 5 && y == 28
                    || x == 6 && y == 28
                    || x == 5 && y == 27) {
                    expect(board.isEmpty(x, y)).toBe(true)
                } else {
                    expect(board.isEmpty(x, y)).toBe(false)
                }
            }
        }
    });
})
