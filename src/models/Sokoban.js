import {MoveDiff} from "./MoveAction.js";
import {SquareType} from "./SquareType.js";

/**
 * Represent a Sokoban game.
 */
export default class Sokoban {
    height;
    width;
    isWin;
    board;
    boxBoard;
    player;
    goalLeft;

    /**
     * @param {number} height
     * @param {number} width
     * @param {SquareType[][]} board a 2-d array of types of each square
     * @param {boolean[][]} boxBoard a 2-d array of boolean indicating if there is a box in each square
     * @param {number[]} player the player's position represented with two numbers
     */
    constructor(height, width, board, boxBoard, player) {
        this.height = height;
        this.width = width;
        this.isWin = false;
        this.board = board;
        this.player = player;
        this.boxBoard = boxBoard;

        let goalLeft = 0;
        for (const [i, row] of board.entries()) {
            for (const [j, square] of row.entries()) {
                if (square === SquareType.GOAL && !boxBoard[i][j]) {
                    goalLeft++;
                }
            }
        }
        this.goalLeft = goalLeft;
        this.checkWin();
    }

    /**
     * Handles the player move action.
     * @param {MoveAction} moveAction
     */
    move(moveAction) {
        if (this.isWin) {
            return;
        }
        const [x, y] = this.player;
        const [dx, dy] = MoveDiff[moveAction];
        // check if the player can move to (xx, yy)
        const [xx, yy] = [x + dx, y + dy];
        if (this.board[xx][yy] === SquareType.WALL) {
            // blocked by the wall
            return;
        }
        if (!this.boxBoard[xx][yy]) {
            // no box on (xx, yy) so move the player
            this.player = [xx, yy];
            return;
        }
        // there is a box on (xx, yy)
        // check if the box can be moved to (xxx, yyy)
        const [xxx, yyy] = [xx + dx, yy + dy];
        if (this.board[xxx][yyy] === SquareType.WALL || this.boxBoard[xxx][yyy]) {
            return;
        }
        // move the player and the box
        this.player = [xx, yy];
        this.boxBoard[xx][yy] = false;
        if (this.board[xx][yy] === SquareType.GOAL) {
            this.goalLeft++;
        }
        this.boxBoard[xxx][yyy] = true;
        if (this.board[xxx][yyy] === SquareType.GOAL) {
            this.goalLeft--;
        }
        this.checkWin();
    }

    /**
     * Checks and updates the win status.
     */
    checkWin() {
        if (this.goalLeft === 0) {
            this.isWin = true;
        }
    }

}


