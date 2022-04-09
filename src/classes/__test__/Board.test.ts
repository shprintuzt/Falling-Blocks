import { Board } from '../Board';
import { Direction, PieceOp } from '../CurrentPiece';
import { getPieceShape, Piece } from '../PieceType';

describe('Board test', () => {
    test('create 10 x 30 empty board', () => {
        let board = new Board(10, 30)
        expect(board.width).toEqual(10);
        expect(board.height).toEqual(30);
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                expect(board.isFilled(x, y)).toBe(false)
            }
        }
    });
    test('fill the 11th horizontal line', () => {
        let board = new Board(10, 30)
        board.fillRow(10)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (y == 10) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
                }
            }
        }
    });
    test('fill the 2nd horizontal line and check', () => {
        let board = new Board(10, 30)
        board.fillRow(2)
        for (let y = 0; y < 30; ++y) {
            if (y == 2) {
                expect(board.isRowFilled(y)).toBe(true)
            } else {
                expect(board.isRowFilled(y)).toBe(false)
            }
        }
    });
    test('fill the 3rd horizontal line', () => {
        let board = new Board(10, 30)
        board.fillRow(2)
        board.putBlock(3, 4)
        board.eraceFilledRow()
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 3 && y == 3) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
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
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
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
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
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
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
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
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
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
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
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
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
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
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
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
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
                }
            }
        }
        board.do(PieceOp.Rotate, Direction.Left)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 29
                    || x == 4 && y == 28
                    || x == 4 && y == 27
                    || x == 5 && y == 27) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
                }
            }
        }
        board.do(PieceOp.Rotate, Direction.Right)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 6 && y == 29
                    || x == 4 && y == 28) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
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
                    expect(board.isFilled(x, y)).toBe(true)
                } else if (x == 5 && y == 27) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
                }
            }
        }
        board.do(PieceOp.Rotate, Direction.Right)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 3 && y == 29
                    || x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 5 && y == 28) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else if (x == 5 && y == 27) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
                }
            }
        }
        board.do(PieceOp.Rotate, Direction.Left)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 4 && y == 28
                    || x == 4 && y == 27) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else if (x == 5 && y == 27) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
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
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
                }
            }
        }
        board.do(PieceOp.Move, Direction.Right)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 5 && y == 29
                    || x == 6 && y == 29
                    || x == 7 && y == 29
                    || x == 6 && y == 28) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
                }
            }
        }
        board.do(PieceOp.Move, Direction.Down)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 5 && y == 28
                    || x == 6 && y == 28
                    || x == 7 && y == 28
                    || x == 6 && y == 27) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
                }
            }
        }
        board.do(PieceOp.Move, Direction.Left)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 28
                    || x == 5 && y == 28
                    || x == 6 && y == 28
                    || x == 5 && y == 27) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
                }
            }
        }
    });
    test('move piece L right out of board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.L)
        board.updateBoard()
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 6 && y == 29
                    || x == 4 && y == 28) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
                }
            }
        }
        board.do(PieceOp.Move, Direction.Right)
        board.do(PieceOp.Move, Direction.Right)
        board.do(PieceOp.Move, Direction.Right)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 7 && y == 29
                    || x == 8 && y == 29
                    || x == 9 && y == 29
                    || x == 7 && y == 28) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
                }
            }
        }
        board.do(PieceOp.Move, Direction.Right)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 7 && y == 29
                    || x == 8 && y == 29
                    || x == 9 && y == 29
                    || x == 7 && y == 28) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
                }
            }
        }
    });
    test('drop piece', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.O)
        board.drop(false)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 4 && y == 28
                    || x == 5 && y == 28
                    || x == 4 && y == 1
                    || x == 5 && y == 1
                    || x == 4 && y == 0
                    || x == 5 && y == 0) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
                }
            }
        }
    })
    test('updateBoard callback test', () => {
        let board = new Board(10, 30)
        let isCallbackCalled = false
        const updateBoardCallback = () => {
            isCallbackCalled = true
        }
        board.addUpdateBoardCallback(updateBoardCallback)
        board.newCurrentPiece(Piece.O)
        board.do(PieceOp.Rotate, Direction.Right)
        expect(isCallbackCalled).toBe(true)
    })
})
describe('Fix piece', () => {
    test('fix piece Z and add new piece', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.Z)
        board.updateBoard()
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 5 && y == 28
                    || x == 6 && y == 28) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
                }
            }
        }
        for (let i = 0; i < 29; ++i) {
            board.do(PieceOp.Move, Direction.Down);
        }
        let nextPieceShape = getPieceShape(board.currentPiece)
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 1
                    || x == 5 && y == 1
                    || x == 5 && y == 0
                    || x == 6 && y == 0) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else if (x == nextPieceShape[0].x && y == nextPieceShape[0].y
                    || x == nextPieceShape[1].x && y == nextPieceShape[1].y
                    || x == nextPieceShape[2].x && y == nextPieceShape[2].y
                    || x == nextPieceShape[3].x && y == nextPieceShape[3].y) {
                    expect(board.isFilled(x, y)).toBe(true)
                } else {
                    expect(board.isFilled(x, y)).toBe(false)
                }
            }
        }
    });
    test('game over', () => {
        let board = new Board(10, 30)
        let gameOverCallbackCalled = false
        const gameOverCallback = () => {
            gameOverCallbackCalled = true
        }
        board.addGameOverCallback(gameOverCallback)
        board.newCurrentPiece(Piece.O)
        board.updateBoard()
        for (let i = 0; i < 28; ++i) {
            board.do(PieceOp.Move, Direction.Down);
        }
        board.putBlock(4, 29);
        board.do(PieceOp.Move, Direction.Down, false);
        expect(gameOverCallbackCalled).toBe(true)
    });
    test('succeed to erace two rows', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.O)
        board.updateBoard()
        for (let y = 0; y < 29; ++y) {
            board.do(PieceOp.Move, Direction.Down, false);
        }
        for (let x = 0; x < 4; ++x) {
            board.do(PieceOp.Move, Direction.Left)
        }
        for (let y = 0; y < 29; ++y) {
            board.do(PieceOp.Move, Direction.Down, false);
        }
        for (let x = 0; x < 2; ++x) {
            board.do(PieceOp.Move, Direction.Left)
        }
        for (let y = 0; y < 29; ++y) {
            board.do(PieceOp.Move, Direction.Down, false);
        }
        for (let x = 0; x < 2; ++x) {
            board.do(PieceOp.Move, Direction.Right)
        }
        for (let y = 0; y < 29; ++y) {
            board.do(PieceOp.Move, Direction.Down, false);
        }
        for (let x = 0; x < 4; ++x) {
            board.do(PieceOp.Move, Direction.Right)
        }
        for (let y = 0; y < 29; ++y) {
            board.do(PieceOp.Move, Direction.Down, false);
        }

        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 28; ++y) {
                expect(board.isFilled(x, y)).toBe(false)
            }
        }
    });
});

const isFilled = (board: Board, positions: Point[]): void => {
    for (let x = 0; x < board.width; ++x) {
        for (let y = 0; y < board.height; ++y) {
            for (const position of positions) {
                if (x == position.x && y == position.y) {
                    expect(board.isFilled(x, y)).toBe(true)
                    continue;
                }
            }
            expect(board.isFilled(x, y)).toBe(false)
        }
    }
}
