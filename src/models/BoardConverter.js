import {OldSquareType} from './OldBoards.js';
import {SquareType} from "./SquareType.js";
import './Sokoban.js';
import Sokoban from "./Sokoban.js";

/**
 * Converts the board from mathisfun to a Sokoban object.
 * @param {OldSquareType[][]} oldBoard
 * @returns {Sokoban}
 */
export function boardConverter(oldBoard) {
    const height = oldBoard.length;
    const width = oldBoard[0].length;
    const board = [];
    const boxBoard = [];
    let player;

    for (const [i, oldRow] of oldBoard.entries()) {
        const row = [];
        const boxRow = [];
        for (const [j, oldSquare] of oldRow.entries()) {
            // generate board
            if (oldSquare === OldSquareType.WALL) {
                row.push(SquareType.WALL);
            } else if (oldSquare === OldSquareType.TARGET || oldSquare === OldSquareType.CARGO_ON_TARGET || oldSquare === OldSquareType.KEEPER_ON_TARGET) {
                row.push(SquareType.GOAL);
            } else {
                row.push(SquareType.FLOOR);
            }

            // generate boxes
            if (oldSquare === OldSquareType.CARGO || oldSquare === OldSquareType.CARGO_ON_TARGET) {
                boxRow.push(true);
            } else {
                boxRow.push(false);
            }

            // generate player
            if (oldSquare === OldSquareType.KEEPER || oldSquare === OldSquareType.KEEPER_ON_TARGET) {
                player = [i, j];
            }
        }
        board.push(row);
        boxBoard.push(boxRow);
    }

    return new Sokoban(height, width, board, boxBoard, player);
}
