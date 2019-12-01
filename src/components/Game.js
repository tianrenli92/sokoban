import React, {Component} from 'react';
import {boardConverter} from "../models/BoardConverter";
import {OldBoards} from "../models/OldBoards";
import {SquareType} from "../models/SquareType";
import './Game.css';

export default class Game extends Component {
    constructor(props) {
        super(props);
        const {level} = props.match.params;
        const game = boardConverter(OldBoards[level]);
        this.state = {
            level,
            game,
        };
    }

    render() {
        const {level, game} = this.state;
        const {isWin, board, boxBoard, player} = game;
        const [playerX, playerY] = player;
        return (
            <div>
                <div>Level {level} <span id="win-status">{isWin ? 'You win!' : ''}</span></div>
                <table id="board">
                    {board.map((row, i) => (
                        <tr>
                            {row.map((square, j) => {
                                const squareClass =
                                    (square === SquareType.WALL) ? 'wall'
                                        : (square === SquareType.FLOOR) ? 'floor'
                                        : (square === SquareType.GOAL) ? 'goal'
                                            : '';
                                const boxSquare = boxBoard[i][j];
                                const boxSquareClass = boxSquare ? 'box'
                                    : (playerX === i && playerY === j) ? 'player'
                                        : '';
                                return (
                                    <td className={`${squareClass} ${boxSquareClass}`}>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </table>
            </div>);
    }
}
