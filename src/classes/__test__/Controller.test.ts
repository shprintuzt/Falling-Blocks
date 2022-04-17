import { Board } from "../Board";
import { Controller, Mode } from "../Controller";
import { Direction, DirectionType, PieceOp, PieceOpType } from "../CurrentPiece";
import { getPieceShape, getRandomPiece, Piece } from "../PieceType";

describe('Controller test', () => {
    test('create controller', () => {
        let controller = new Controller();
        expect(controller.playing).toBe(false);
        expect(controller.score).toBe(0);
        expect(controller.totalErasedRowNum).toBe(0);
        expect(controller.mode).toBe(Mode.None);
    });
    test('start normal game', () => {
        let controller = new Controller();
        controller.startNormal()
        expect(controller.playing).toBe(true);
        expect(controller.score).toBe(0);
        expect(controller.totalErasedRowNum).toBe(0);
        expect(controller.mode).toBe(Mode.Normal);
    });
    test('start erasing game', () => {
        let controller = new Controller();
        let callbackCalled = false
        const callback = () => {
            callbackCalled = true
        }
        controller.addUpdateBoardCallback(callback)

        expect(callbackCalled).toBe(false);
        controller.startErasing()
        expect(callbackCalled).toBe(true);

        expect(controller.playing).toBe(true);
        expect(controller.score).toBe(0);
        expect(controller.totalErasedRowNum).toBe(0);
        expect(controller.mode).toBe(Mode.Erasing);
    });
    test('game over callback', () => {
        let controller = new Controller();
        let gameOverCallbackCalled = false
        const gameOverCallback = () => {
            gameOverCallbackCalled = true
        }
        controller.addGameOverCallback(gameOverCallback)
        const res = controller.board.newCurrentPiece(Piece.O)
        if (!res) {
            controller.doGameOverCallbacks();
        } else {
            controller.board.updateBoard();
            controller.doUpdateBoardCallbacks();
        }

        doOp(controller, controller.board, PieceOp.Move, Direction.Down, 28);

        controller.board.putBlock(4, 29);
        controller.moveDown()

        expect(gameOverCallbackCalled).toBe(true)
    });
    test('update board callback', () => {
        let controller = new Controller();
        const res = controller.board.newCurrentPiece(Piece.O)
        controller.board.updateBoard();
        controller.doUpdateBoardCallbacks();

        let callbackCalled = false
        const callback = () => {
            callbackCalled = true
        }
        controller.addUpdateBoardCallback(callback)

        expect(callbackCalled).toBe(false);
        doOp(controller, controller.board, PieceOp.Move, Direction.Down, 28);
        expect(callbackCalled).toBe(true);

        controller.board.putBlock(4, 29);
        controller.moveDown()
    });
    test('succeed to erase two rows', () => {
        let controller = new Controller()
        let erasedRowNum = 0
        const rowErasedCallback = (rowNum: number) => {
            erasedRowNum = rowNum;
        }
        controller.board.addRowErasedCallback(rowErasedCallback)
        const res = controller.board.newCurrentPiece(Piece.O);
        expect(res).toBe(true)

        expect(controller.board.pieceNum).toBe(1);
        controller.board.updateBoard();

        doOp(controller, controller.board, PieceOp.Move, Direction.Down, 29, false);

        doOp(controller, controller.board, PieceOp.Move, Direction.Left, 4);
        doOp(controller, controller.board, PieceOp.Move, Direction.Down, 29, false);

        doOp(controller, controller.board, PieceOp.Move, Direction.Left, 2);
        controller.drop(false);

        doOp(controller, controller.board, PieceOp.Move, Direction.Right, 2);
        controller.drop(false);

        doOp(controller, controller.board, PieceOp.Move, Direction.Right, 4);
        controller.drop(false);

        expect(controller.board.pieceNum).toBe(6)
        expect(erasedRowNum).toBe(2)
    });
});

const doOp = (
    controller: Controller,
    board: Board,
    op: PieceOpType,
    direction: DirectionType,
    cnt: number,
    random = true
): void => {
    for (let i = 0; i < cnt; ++i) {
        const doRes = board.do(op, direction, random);
        board.updateBoard();
        controller.doUpdateBoardCallbacks();
        if (!doRes) {
            const nextPiece = random ? getRandomPiece() : Piece.O
            const res = board.newCurrentPiece(nextPiece);
            if (!res) {
                controller.doGameOverCallbacks();
            } else {
                board.updateBoard();
                controller.doUpdateBoardCallbacks();
            }
        }
    }
}

