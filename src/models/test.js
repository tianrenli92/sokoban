import {boardConverter} from "./BoardConverter.js";
import {OldBoards} from "./OldBoards.js";

function showBoard(board) {
    for (const row of board) {
        console.log(row);
    }
}

const sokoban = boardConverter(OldBoards[0]);
showBoard(sokoban.board);
showBoard(sokoban.boxBoard);
