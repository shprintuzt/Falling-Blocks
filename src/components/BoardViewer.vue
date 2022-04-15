<template>
    <button @click="start"
        v-show="!playing">
        通常モード
    </button>
    <button @click="startRandom"
        v-show="!playing">
        ブロック消しモード
    </button>
    <div v-show="playing">
        <canvas ref="canvas" width="100" height="300"/>
        <p>点数: {{ score }}</p>
        <p>消した行数: {{ erasedRowTotalNum }}</p>
        <img @click="drop" src="@/assets/drop.svg"/>
        <img @click="moveDown" src="@/assets/arrow_down.svg"/>
        <img @click="moveLeft" src="@/assets/arrow_left.svg"/>
        <img @click="moveRight" src="@/assets/arrow_right.svg"/>
        <img @click="rotateLeft" src="@/assets/rotate_left.svg"/>
        <img @click="rotateRight" src="@/assets/rotate_right.svg"/>
    </div>
</template>

<script lang="ts">
import { onMounted } from '@vue/runtime-core'
import { Board, Cell } from '@/classes/Board'
import { Piece } from '@/classes/PieceType'
import { ref } from 'vue'
import { Direction, PieceOp } from '@/classes/CurrentPiece'
export default {
    setup() {
        let board: Board = new Board(10, 30);
        const canvas = ref<HTMLCanvasElement>();
        const playing = ref(false);
        const score = ref(0)
        const erasedRowTotalNum = ref(0)

        onMounted(() => {
            board.addUpdateBoardCallback(updateBoardCallback);
            board.addGameOverCallback(gameOverCallback);
            board.addRowErasedCallback(rowErasedCallback);
            window.addEventListener('keyup', (e) => {
                if (e.key == 'ArrowRight') {
                    moveRight()
                } else if (e.key == 'ArrowLeft') {
                    moveLeft()
                } else if (e.key == 'z') {
                    rotateLeft()
                } else if (e.key == 'c') {
                    rotateRight()
                } else if (e.key == 'ArrowUp') {
                    drop()
                }
            })
        })

        const updateBoardCallback = () => {
            draw();
        }

        const gameOverCallback = () => {
            board.clearBoard(10, 30);
            playing.value = false
        }

        const rowErasedCallback = (rowNum: number) => {
            score.value += rowNum * rowNum * 100
            erasedRowTotalNum.value += rowNum
        }

        const draw = () => {
            if (canvas.value == null) return;
            let ctx = canvas.value?.getContext("2d");
            if (ctx == null) return;
            ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
            for (let x = 0; x < 10; x++) {
                for (let y = 0; y < 30; y++) {
                    const cellKind = board.getCell(x, y);
                    if (cellKind == Cell.Filled) {
                        ctx.fillStyle = 'black';
                    } else if (cellKind == Cell.Shadow) {
                        ctx.fillStyle = 'gray';
                    } else if (cellKind == Cell.Red) {
                        ctx.fillStyle = 'red';
                    } else {
                        ctx.fillStyle = 'lightgray';
                    }
                    ctx.fillRect(10 * x, 10 * (29 - y), 9, 9);
                }
            }
        }

        const start = () => {
            board.newCurrentPiece(Piece.O);
            board.updateBoard()
            playing.value = true
            score.value = 0
            erasedRowTotalNum.value = 0
        }

        const startRandom = () => {
            board.putBlocksRandomly(20)
            start()
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
            score,
            erasedRowTotalNum,
            start,
            startRandom,
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