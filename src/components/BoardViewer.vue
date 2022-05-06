<template>
    <button @click="startNormal"
        v-show="!playing">
        通常モード
    </button>
    <button @click="startRandom"
        v-show="!playing">
        ブロック消しモード
    </button>
    <p v-show="cleared">クリア！！！</p>
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
import { Cell } from '@/classes/Board'
import { Piece } from '@/classes/PieceType'
import { ref } from 'vue'
import { Direction, PieceOp } from '@/classes/CurrentPiece'
import { Controller, Mode } from '@/classes/Controller'
export default {
    setup() {
        let controller: Controller = new Controller();
        const canvas = ref<HTMLCanvasElement>();
        const playing = ref(false);
        const cleared = ref(false);
        const score = ref(0)
        const erasedRowTotalNum = ref(0)

        onMounted(() => {
            controller.addUpdateBoardCallback(updateBoardCallback);
            controller.addGameOverCallback(gameOverCallback);
            controller.addRowErasedCallback(rowErasedCallback);
            window.addEventListener('keyup', (e) => {
                if (e.key == 'ArrowRight') {
                    moveRight()
                } else if (e.key == 'ArrowLeft') {
                    moveLeft()
                } else if (e.key == 'ArrowDown') {
                    moveDown()
                } else if (e.key == 'ArrowUp') {
                    drop()
                } else if (e.key == 'z') {
                    rotateLeft()
                } else if (e.key == 'x') {
                    rotateRight()
                }
            })
        })

        const updateBoardCallback = () => {
            draw();
        }

        const gameOverCallback = () => {
            playing.value = false
        }

        const rowErasedCallback = (rowNum: number) => {
            score.value += rowNum * rowNum * 100
            erasedRowTotalNum.value += rowNum
            if (Mode.Erasing && !controller.board.hasRedBlock()) {
                playing.value = false;
                cleared.value = true;
            }
        }

        const draw = () => {
            if (canvas.value == null) return;
            let ctx = canvas.value?.getContext("2d");
            if (ctx == null) return;
            ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
            for (let x = 0; x < 10; x++) {
                for (let y = 0; y < 30; y++) {
                    const cellKind = controller.board.getCell(x, y);
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

        const startNormal = () => {
            controller.startNormal()
            playing.value = controller.playing
            cleared.value = false;
        }

        const startRandom = () => {
            controller.startErasing()
            playing.value = controller.playing
            cleared.value = false;
        }

        const drop = () => {
            controller.drop()
        }

        const moveDown = () => {
            controller.moveDown()
        }

        const moveLeft = () => {
            controller.moveLeft()
        }

        const moveRight = () => {
            controller.moveRight()
        }

        const rotateLeft = () => {
            controller.rotateLeft()
        }

        const rotateRight = () => {
            controller.rotateRight()
        }

        return {
            canvas,
            playing,
            cleared,
            score,
            erasedRowTotalNum,
            startNormal,
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