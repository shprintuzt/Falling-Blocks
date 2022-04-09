import { Point } from '@/interfaces/Point';
import { Board, Cell } from '../Board';
import { Direction, DirectionType, PieceOp, PieceOpType } from '../CurrentPiece';
import { getPieceShape, Piece } from '../PieceType';

describe('Board test', () => {
    test('create 10 x 30 empty board', () => {
        let board = new Board(10, 30)
        expect(board.width).toEqual(10);
        expect(board.height).toEqual(30);
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                expect(board.isFilled(x, y)).toBe(Cell.Empty);
            }
        }
        isFilled(board, [])
    });
    test('fill the 11th horizontal line', () => {
        let board = new Board(10, 30);
        board.fillRow(10);
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (y == 10) {
                    expect(board.isFilled(x, y)).toBe(Cell.Filled);
                } else {
                    expect(board.isFilled(x, y)).toBe(Cell.Empty);
                }
            }
        }
        isFilled(board, [], [10])
    });
    test('isRowFilled test', () => {
        let board = new Board(10, 30);
        board.fillRow(2);
        for (let y = 0; y < 30; ++y) {
            if (y == 2) {
                expect(board.isRowFilled(y)).toBe(Cell.Filled);
            } else {
                expect(board.isRowFilled(y)).toBe(Cell.Empty);
            }
        }
    });
    test('erase the 3rd horizontal line', () => {
        let board = new Board(10, 30);
        board.fillRow(2);
        board.putBlock(3, 4);
        board.eraceFilledRow();
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 3 && y == 3) {
                    expect(board.isFilled(x, y)).toBe(Cell.Filled);
                } else {
                    expect(board.isFilled(x, y)).toBe(Cell.Empty);
                }
            }
        }
    });
})
describe('Piece shape test', () => {
    test('update a current piece to O and board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.O)

        // initial piece position test
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
                    expect(board.isFilled(x, y)).toBe(Cell.Filled)
                } else {
                    expect(board.isFilled(x, y)).toBe(Cell.Empty)
                }
            }
        }
        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 4, y: 28},
            {x: 5, y: 28}])
    });
    test('update a current piece to I and board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.I)
        board.updateBoard()
        isFilled(board, [
            {x: 3, y: 29},
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 6, y: 29}])
    });
    test('update a current piece to Z and board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.Z)
        board.updateBoard()
        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 5, y: 28},
            {x: 6, y: 28}])
    });
    test('update a current piece to S and board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.S)
        board.updateBoard()
        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 3, y: 28},
            {x: 4, y: 28}])
    });
    test('update a current piece to L and board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.L)
        board.updateBoard()
        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 6, y: 29},
            {x: 4, y: 28}])
    });
    test('update a current piece to LR and board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.LR)
        board.updateBoard()
        isFilled(board, [
            {x: 3, y: 29},
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 5, y: 28}])
    });
    test('update a current piece to T and board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.T)
        board.updateBoard()
        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 6, y: 29},
            {x: 5, y: 28}])
    });
});
describe('Piece rotation', () => {
    test('rotate piece L in empty board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.L)
        board.updateBoard()
        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 6, y: 29},
            {x: 4, y: 28}])
        board.do(PieceOp.Rotate, Direction.Left)
        isFilled(board, [
            {x: 4, y: 29},
            {x: 4, y: 28},
            {x: 4, y: 27},
            {x: 5, y: 27}])
        board.do(PieceOp.Rotate, Direction.Right)
        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 6, y: 29},
            {x: 4, y: 28}])
    })
    test('rotate piece LR in non-empty board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.LR)
        board.putBlock(5, 27)
        board.updateBoard()
        isFilled(board, [
            {x: 3, y: 29},
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 5, y: 28},
            {x: 5, y: 27},
        ])
        board.do(PieceOp.Rotate, Direction.Right)
        isFilled(board, [
            {x: 3, y: 29},
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 5, y: 28},
            {x: 5, y: 27},
        ])
        board.do(PieceOp.Rotate, Direction.Left)
        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 4, y: 28},
            {x: 4, y: 27},
            {x: 5, y: 27},
        ])
    })
});
describe('Piece move', () => {
    test('move piece T in empty board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.T)
        board.updateBoard()
        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 6, y: 29},
            {x: 5, y: 28},
        ])
        board.do(PieceOp.Move, Direction.Right)
        isFilled(board, [
            {x: 5, y: 29},
            {x: 6, y: 29},
            {x: 7, y: 29},
            {x: 6, y: 28},
        ])
        board.do(PieceOp.Move, Direction.Down)
        isFilled(board, [
            {x: 5, y: 28},
            {x: 6, y: 28},
            {x: 7, y: 28},
            {x: 6, y: 27},
        ])
        board.do(PieceOp.Move, Direction.Left)
        isFilled(board, [
            {x: 4, y: 28},
            {x: 5, y: 28},
            {x: 6, y: 28},
            {x: 5, y: 27},
        ])
    });
    test('move piece L right out of board', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.L)
        board.updateBoard()
        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 6, y: 29},
            {x: 4, y: 28},
        ])
        board.do(PieceOp.Move, Direction.Right)
        board.do(PieceOp.Move, Direction.Right)
        board.do(PieceOp.Move, Direction.Right)
        isFilled(board, [
            {x: 7, y: 29},
            {x: 8, y: 29},
            {x: 9, y: 29},
            {x: 7, y: 28},
        ])
        board.do(PieceOp.Move, Direction.Right)
        isFilled(board, [
            {x: 7, y: 29},
            {x: 8, y: 29},
            {x: 9, y: 29},
            {x: 7, y: 28},
        ])
    });
    test('drop piece', () => {
        let board = new Board(10, 30)
        board.newCurrentPiece(Piece.O)
        board.drop(false)
        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 4, y: 28},
            {x: 5, y: 28},
            {x: 4, y: 1},
            {x: 5, y: 1},
            {x: 4, y: 0},
            {x: 5, y: 0},
        ])
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
        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 5, y: 28},
            {x: 6, y: 28},
        ])

        doOp(board, PieceOp.Move, Direction.Down, 29);

        let nextPieceShape = getPieceShape(board.currentPiece)
        isFilled(board, [
            {x: 4, y: 1},
            {x: 5, y: 1},
            {x: 5, y: 0},
            {x: 6, y: 0},
            {x: nextPieceShape[0].x, y: nextPieceShape[0].y},
            {x: nextPieceShape[1].x, y: nextPieceShape[1].y},
            {x: nextPieceShape[2].x, y: nextPieceShape[2].y},
            {x: nextPieceShape[3].x, y: nextPieceShape[3].y},
        ])
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

        doOp(board, PieceOp.Move, Direction.Down, 28);

        board.putBlock(4, 29);
        board.do(PieceOp.Move, Direction.Down, false);

        expect(gameOverCallbackCalled).toBe(true)
    });
    test('succeed to erace two rows', () => {
        let board = new Board(10, 30);
        let erasedRowNum = 0
        const rowErasedCallback = (rowNum: number) => {
            erasedRowNum = rowNum;
        }
        board.addRowErasedCallback(rowErasedCallback)
        board.newCurrentPiece(Piece.O);
        board.updateBoard();

        doOp(board, PieceOp.Move, Direction.Down, 29, false);

        doOp(board, PieceOp.Move, Direction.Left, 4);
        doOp(board, PieceOp.Move, Direction.Down, 29, false);

        doOp(board, PieceOp.Move, Direction.Left, 2);
        board.drop(false);

        doOp(board, PieceOp.Move, Direction.Right, 2);
        board.drop(false);

        doOp(board, PieceOp.Move, Direction.Right, 4);
        board.drop(false);

        let nextPieceShape = getPieceShape(board.currentPiece);
        isFilled(board, [
            {x: nextPieceShape[0].x, y: nextPieceShape[0].y},
            {x: nextPieceShape[1].x, y: nextPieceShape[1].y},
            {x: nextPieceShape[2].x, y: nextPieceShape[2].y},
            {x: nextPieceShape[3].x, y: nextPieceShape[3].y},
        ]);

        expect(erasedRowNum).toBe(2)
    });
});

const isFilled = (board: Board, positions: Point[], ys: number[] = []): void => {
    for (let x = 0; x < board.width; ++x) {
        for (let y = 0; y < board.height; ++y) {
            let result = ys.includes(y) ? Cell.Filled : Cell.Empty;
            for (const position of positions) {
                if (x == position.x && y == position.y) {
                    result = true;
                    break;
                }
            }
            expect(board.isFilled(x, y)).toBe(result)
        }
    }
}

const doOp = (
    board: Board,
    op: PieceOpType,
    direction: DirectionType,
    cnt: number,
    random = true
): void => {
    for (let i = 0; i < cnt; ++i) {
        board.do(op, direction, random);
    }
}