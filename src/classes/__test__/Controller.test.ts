import { Controller, Mode } from "../Controller";

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
});