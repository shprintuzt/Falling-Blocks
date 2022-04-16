import { Board } from "../Board";
import { Controller, Mode } from "../Controller";
import { Direction, DirectionType, PieceOp, PieceOpType } from "../CurrentPiece";
import { getRandomPiece, Piece } from "../PieceType";

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
        controller.startErasing()
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
            controller.board.doGameOverCallbacks();
        } else {
            controller.board.updateBoard()
        }

        doOp(controller.board, PieceOp.Move, Direction.Down, 28);

        controller.board.putBlock(4, 29);
        controller.moveDown()

        expect(gameOverCallbackCalled).toBe(true)
    });
});

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
            if (!res) {
                board.doGameOverCallbacks();
            } else {
                board.updateBoard();
            }
        }
    }
}

