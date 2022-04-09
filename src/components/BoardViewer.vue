<template>
    <button @click="start"
        v-show="!playing">
        start
    </button>
    <div v-show="playing">
        <canvas ref="canvas" width="100" height="300"/>
        <button @click="drop">drop</button>
        <button @click="moveDown">down</button>
        <button @click="moveLeft">move left</button>
        <button @click="moveRight">move right</button>
        <button @click="rotateLeft">rotate left</button>
        <button @click="rotateRight">rotate right</button>
    </div>
</template>

<script lang="ts">
import { onMounted } from '@vue/runtime-core'
import { Board } from '@/classes/Board'
import { Piece } from '@/classes/PieceType'
import { ref } from 'vue'
import { Direction, PieceOp } from '@/classes/CurrentPiece'
export default {
    setup() {
        let board: Board = new Board(10, 30);
        const canvas = ref<HTMLCanvasElement>();
        const playing = ref(false);

        onMounted(() => {
            board.newCurrentPiece(Piece.O);
            board.addUpdateBoardCallback(updateBoardCallback);
            board.addGameOverCallback(gameOverCallback);
            board.updateBoard()
        })

        const updateBoardCallback = () => {
            draw();
        }

        const gameOverCallback = () => {
            board.clearBoard(10, 30);
            board.newCurrentPiece(Piece.O);
            playing.value = false
        }

        const draw = () => {
            if (canvas.value == null) return;
            let ctx = canvas.value?.getContext("2d");
            if (ctx == null) return;
            ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
            for (let x = 0; x < 10; x++) {
                for (let y = 0; y < 30; y++) {
                    if (board.isFilled(x, y)) {
                        ctx.fillStyle = 'black';
                    } else {
                        ctx.fillStyle = 'lightgray';
                    }
                    ctx.fillRect(10 * x, 10 * (29 - y), 9, 9);
                }
            }
        }

        const start = () => {
            playing.value = true
        }

        const drop = () => {
            board.drop()
        }

        const moveDown = () => {
            board.do(PieceOp.Move, Direction.Down)
        }

        const moveLeft = () => {
            board.do(PieceOp.Move, Direction.Left)
        }

        const moveRight = () => {
            board.do(PieceOp.Move, Direction.Right)
        }

        const rotateLeft = () => {
            board.do(PieceOp.Rotate, Direction.Left)
        }

        const rotateRight = () => {
            board.do(PieceOp.Rotate, Direction.Right)
        }

        return {
            canvas,
            playing,
            start,
            drop,
            moveDown,
            moveLeft,
            moveRight,
            rotateLeft,
            rotateRight,
        }
    }
}
</script>