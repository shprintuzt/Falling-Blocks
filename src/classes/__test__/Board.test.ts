import { Point } from '@/interfaces/Point';
import { Board, Cell } from '../Board';
import { Direction, DirectionType, PieceOp, PieceOpType } from '../CurrentPiece';
import { getPieceShape, getRandomPiece, Piece } from '../PieceType';

describe('Board test', () => {
    test('create 10 x 30 empty board', () => {
        let board = new Board(10, 30)
        expect(board.width).toEqual(10);
        expect(board.height).toEqual(30);
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                expect(board.getCell(x, y)).toBe(Cell.Empty);
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
                    expect(board.getCell(x, y)).toBe(Cell.Filled);
                } else {
                    expect(board.getCell(x, y)).not.toBe(Cell.Filled);
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
                expect(board.isRowFilled(y)).toBe(true);
            } else {
                expect(board.isRowFilled(y)).toBe(false);
            }
        }
    });
    test('erase the 3rd horizontal line', () => {
        let board = new Board(10, 30);
        board.fillRow(2);
        board.putBlock(3, 4);
        board.eraseFilledRow();
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 3 && y == 3) {
                    expect(board.getCell(x, y)).toBe(Cell.Filled);
                } else {
                    expect(board.getCell(x, y)).not.toBe(Cell.Filled);
                }
            }
        }
    });
})
describe('Piece shape test', () => {
    test('update a current piece to O and board', () => {
        let board = new Board(10, 30)
        const res = board.newCurrentPiece(Piece.O);
        expect(res).toBe(true)

        // initial piece position test
        expect(board.currentPiece.degree).toBe(0)
        expect(board.currentPiece.x).toBe(10 / 2 - 1)
        expect(board.currentPiece.y).toBe(30 - 1)
        board.updateBoard();
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 30; ++y) {
                if (x == 4 && y == 29
                    || x == 5 && y == 29
                    || x == 4 && y == 28
                    || x == 5 && y == 28) {
                    expect(board.getCell(x, y)).toBe(Cell.Filled)
                } else {
                    expect(board.getCell(x, y)).not.toBe(Cell.Filled)
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
        const res = board.newCurrentPiece(Piece.I);
        expect(res).toBe(true)
        board.updateBoard();

        isFilled(board, [
            {x: 3, y: 29},
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 6, y: 29}])
    });
    test('update a current piece to Z and board', () => {
        let board = new Board(10, 30)
        const res = board.newCurrentPiece(Piece.Z);
        expect(res).toBe(true)
        board.updateBoard();

        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 5, y: 28},
            {x: 6, y: 28}])
    });
    test('update a current piece to S and board', () => {
        let board = new Board(10, 30)
        const res = board.newCurrentPiece(Piece.S);
        expect(res).toBe(true)
        board.updateBoard();

        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 3, y: 28},
            {x: 4, y: 28}])
    });
    test('update a current piece to L and board', () => {
        let board = new Board(10, 30)
        const res = board.newCurrentPiece(Piece.L);
        expect(res).toBe(true)
        board.updateBoard();

        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 6, y: 29},
            {x: 4, y: 28}])
    });
    test('update a current piece to LR and board', () => {
        let board = new Board(10, 30)
        const res = board.newCurrentPiece(Piece.LR);
        expect(res).toBe(true)
        board.updateBoard();

        isFilled(board, [
            {x: 3, y: 29},
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 5, y: 28}])
    });
    test('update a current piece to T and board', () => {
        let board = new Board(10, 30)
        const res = board.newCurrentPiece(Piece.T);
        expect(res).toBe(true)
        board.updateBoard();

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
        const res = board.newCurrentPiece(Piece.L);
        expect(res).toBe(true)
        board.updateBoard();

        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 6, y: 29},
            {x: 4, y: 28}])
        board.do(PieceOp.Rotate, Direction.Left)
        board.updateBoard();
        isFilled(board, [
            {x: 4, y: 29},
            {x: 4, y: 28},
            {x: 4, y: 27},
            {x: 5, y: 27}])
        board.do(PieceOp.Rotate, Direction.Right)
        board.updateBoard();
        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 6, y: 29},
            {x: 4, y: 28}])
    })
    test('rotate piece LR in non-empty board', () => {
        let board = new Board(10, 30)
        const res = board.newCurrentPiece(Piece.LR);
        expect(res).toBe(true)

        board.putBlock(5, 27)
        board.updateBoard();
        isFilled(board, [
            {x: 3, y: 29},
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 5, y: 28},
            {x: 5, y: 27},
        ])
        board.do(PieceOp.Rotate, Direction.Right)
        board.updateBoard();
        isFilled(board, [
            {x: 3, y: 29},
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 5, y: 28},
            {x: 5, y: 27},
        ])
        board.do(PieceOp.Rotate, Direction.Left)
        board.updateBoard();
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
        const res = board.newCurrentPiece(Piece.T);
        expect(res).toBe(true)
        board.updateBoard();

        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 6, y: 29},
            {x: 5, y: 28},
        ])
        board.do(PieceOp.Move, Direction.Right)
        board.updateBoard();
        isFilled(board, [
            {x: 5, y: 29},
            {x: 6, y: 29},
            {x: 7, y: 29},
            {x: 6, y: 28},
        ])
        board.do(PieceOp.Move, Direction.Down)
        board.updateBoard();
        isFilled(board, [
            {x: 5, y: 28},
            {x: 6, y: 28},
            {x: 7, y: 28},
            {x: 6, y: 27},
        ])
        board.do(PieceOp.Move, Direction.Left)
        board.updateBoard();
        isFilled(board, [
            {x: 4, y: 28},
            {x: 5, y: 28},
            {x: 6, y: 28},
            {x: 5, y: 27},
        ])
    });
    test('move piece L right out of board', () => {
        let board = new Board(10, 30)
        const res = board.newCurrentPiece(Piece.L);
        expect(res).toBe(true)
        board.updateBoard();

        isFilled(board, [
            {x: 4, y: 29},
            {x: 5, y: 29},
            {x: 6, y: 29},
            {x: 4, y: 28},
        ])
        board.do(PieceOp.Move, Direction.Right)
        board.updateBoard();
        board.do(PieceOp.Move, Direction.Right)
        board.updateBoard();
        board.do(PieceOp.Move, Direction.Right)
        board.updateBoard();
        isFilled(board, [
            {x: 7, y: 29},
            {x: 8, y: 29},
            {x: 9, y: 29},
            {x: 7, y: 28},
        ])
        board.do(PieceOp.Move, Direction.Right)
        board.updateBoard();
        isFilled(board, [
            {x: 7, y: 29},
            {x: 8, y: 29},
            {x: 9, y: 29},
            {x: 7, y: 28},
        ])
    });
    test('drop piece', () => {
        let board = new Board(10, 30)
        const res = board.newCurrentPiece(Piece.O);
        expect(res).toBe(true)

        board.drop();
        board.updateBoard();
        board.eraseFilledRow()
        const res2 = board.newCurrentPiece(Piece.O);
        expect(res2).toBe(true);
        board.updateBoard();

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
})
describe('Fix piece', () => {
    test('fix piece Z and add new piece', () => {
        let board = new Board(10, 30)
        const res = board.newCurrentPiece(Piece.Z);
        expect(res).toBe(true)
        board.updateBoard();

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
    test('do failed', () => {
        let board = new Board(10, 30)
        const res = board.newCurrentPiece(Piece.O);
        expect(res).toBe(true)
        board.updateBoard();

        doOp(board, PieceOp.Move, Direction.Down, 28);

        board.putBlock(4, 29);
        const doResult = board.do(PieceOp.Move, Direction.Down, false);
        board.updateBoard();

        expect(doResult).toBe(false)
    });
    test('succeed to erace two rows', () => {
        let board = new Board(10, 30);
        let erasedRowNum = 0
        const rowErasedCallback = (rowNum: number) => {
            erasedRowNum = rowNum;
        }
        board.addRowErasedCallback(rowErasedCallback)
        const res = board.newCurrentPiece(Piece.O);
        expect(res).toBe(true)

        expect(board.pieceNum).toBe(1);
        board.updateBoard();

        doOp(board, PieceOp.Move, Direction.Down, 29, false);

        doOp(board, PieceOp.Move, Direction.Left, 4);
        doOp(board, PieceOp.Move, Direction.Down, 29, false);

        doOp(board, PieceOp.Move, Direction.Left, 2);
        board.drop();
        board.updateBoard();
        board.eraseFilledRow()
        const res2 = board.newCurrentPiece(Piece.O);
        expect(res2).toBe(true);
        board.updateBoard();

        doOp(board, PieceOp.Move, Direction.Right, 2);
        board.drop();
        board.updateBoard();
        board.eraseFilledRow()
        const res3 = board.newCurrentPiece(Piece.O);
        expect(res3).toBe(true);
        board.updateBoard();

        doOp(board, PieceOp.Move, Direction.Right, 4);
        board.drop();
        board.updateBoard();
        board.eraseFilledRow()
        const res4 = board.newCurrentPiece(Piece.O);
        expect(res4).toBe(true);
        board.updateBoard();
        expect(board.pieceNum).toBe(6)

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
describe('Shadow test', () => {
    test('piece Z\'s shadow', () => {
        let board = new Board(10, 30)
        const res = board.newCurrentPiece(Piece.Z);
        expect(res).toBe(true)
        board.updateBoard();

        isShadow(board, [
            {x: 4, y: 1},
            {x: 5, y: 1},
            {x: 5, y: 0},
            {x: 6, y: 0},
        ])
        // rotation
        doOp(board, PieceOp.Rotate, Direction.Left, 1);
        isShadow(board, [
            {x: 5, y: 2},
            {x: 4, y: 1},
            {x: 5, y: 1},
            {x: 4, y: 0},
        ])
        doOp(board, PieceOp.Move, Direction.Left, 3);
        isShadow(board, [
            {x: 2, y: 2},
            {x: 1, y: 1},
            {x: 2, y: 1},
            {x: 1, y: 0},
        ])
    });
    test('piece Z\'s shadow', () => {
        let board = new Board(10, 30)
        board.putBlock(5, 26)
        const res = board.newCurrentPiece(Piece.L);
        expect(res).toBe(true)
        board.updateBoard();

        isShadow(board, [
            {x: 4, y: 27},
            {x: 5, y: 27},
            {x: 6, y: 27},
            {x: 4, y: 26},
        ])
        doOp(board, PieceOp.Rotate, Direction.Right, 1)
        isShadow(board, [])
        doOp(board, PieceOp.Move, Direction.Right, 1)
        isShadow(board, [
            {x: 5, y: 27},
            {x: 6, y: 26},
            {x: 6, y: 25},
        ])
    });
});
describe('Initialize randomly', () => {
    test('put blocks randomly 3 rows', () => {
        let board = new Board(10, 30)
        board.putBlocksRandomly(3)
        const res = board.newCurrentPiece(Piece.Z);
        expect(res).toBe(true)
        board.updateBoard();

        isRandomBlock(board, 3)
    });
    test('put blocks randomly 3 rows after clear', () => {
        let board = new Board(10, 30)
        board.clearBoard(10, 30)
        board.putBlocksRandomly(3)
        const res = board.newCurrentPiece(Piece.Z);
        expect(res).toBe(true)
        board.updateBoard();

        isRandomBlock(board, 3)
    });
});

const isFilled = (board: Board, positions: Point[], ys: number[] = []): void => {
    for (let x = 0; x < board.width; ++x) {
        for (let y = 0; y < board.height; ++y) {
            let result = ys.includes(y);
            for (const position of positions) {
                if (x == position.x && y == position.y) {
                    result = true;
                    break;
                }
            }
            if (result) {
                expect(board.getCell(x, y)).toBe(Cell.Filled)
            } else {
                expect(board.getCell(x, y)).not.toBe(Cell.Filled)
            }
        }
    }
}

const isShadow = (board: Board, positions: Point[]): void => {
    for (let x = 0; x < board.width; ++x) {
        for (let y = 0; y < board.height; ++y) {
            let result = false;
            for (const position of positions) {
                if (x == position.x && y == position.y) {
                    result = true;
                    break;
                }
            }
            if (result) {
                expect(board.getCell(x, y)).toBe(Cell.Shadow)
            } else {
                expect(board.getCell(x, y)).not.toBe(Cell.Shadow)
            }
        }
    }
}

const isRandomBlock = (board: Board, height: number): void => {
    for (let y = 0; y < height; ++y) {
        let result = false;
        for (let x = 0; x < board.width; ++x) {
            if (board.getCell(x, y) == Cell.Red) {
                result = true;
                break;
            }
        }
        expect(result).toBe(true);
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
        const doRes = board.do(op, direction, random);
        board.updateBoard();
        if (!doRes) {
            const nextPiece = random ? getRandomPiece() : Piece.O
            const res = board.newCurrentPiece(nextPiece);
            expect(res).toBe(true)
            board.updateBoard();
        }
    }
}
