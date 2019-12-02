import React, {Component} from 'react';
import {boardConverter} from "../models/BoardConverter";
import {OldBoards} from "../models/OldBoards";
import {SquareType} from "../models/SquareType";
import {KeyMap, MoveAction} from "../models/MoveAction";
import './Game.css';
import {Link} from "react-router-dom";

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

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    static getDerivedStateFromProps(props, state) {
        const {level} = props.match.params;
        if (level === state.level) {
            return null;
        }
        const game = boardConverter(OldBoards[level]);
        return {level, game};
    }

    restartGame = () => {
        const {level} = this.state;
        const game = boardConverter(OldBoards[level]);
        this.setState({game});
    };

    handleKeyDown = (e) => {
        const action = KeyMap[e.keyCode];
        if (typeof action !== 'undefined') {
            const {game} = this.state;
            game.move(action);
            this.setState({game});
        }
    };

    handleControllerButtonClick = (action) => {
        const {game} = this.state;
        game.move(action);
        this.setState({game});
    };

    render() {
        const {level, game} = this.state;
        const {isWin, board, boxBoard, player} = game;
        const [playerX, playerY] = player;
        return (
            <div>
                <div id="status-bar" className="m-1">
                    <span>Level {level} </span>
                    <span><button onClick={this.restartGame}>Restart</button> </span>
                    {isWin ?
                        <span>
                            <span id="win-status">You win! </span>
                            <span><Link to={`/${parseInt(level) + 1}`}><button>Next Level</button></Link></span>
                        </span>
                        : null}
                </div>
                <div>
                    <table id="board">
                        <tbody>
                        {board.map((row, i) => (
                            <tr key={`row-${i}`}>
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
                                        <td key={`square-${i}-${j}`} className={`${squareClass} ${boxSquareClass}`}>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <table id="controller">
                        <tbody>
                        <tr>
                            <td/>
                            <td className="controller-button"
                                onClick={() => this.handleControllerButtonClick(MoveAction.MOVE_UP)}>↑
                            </td>
                            <td/>
                        </tr>
                        <tr>
                            <td className="controller-button"
                                onClick={() => this.handleControllerButtonClick(MoveAction.MOVE_LEFT)}>←
                            </td>
                            <td className="controller-button"
                                onClick={() => this.handleControllerButtonClick(MoveAction.MOVE_DOWN)}>↓
                            </td>
                            <td className="controller-button"
                                onClick={() => this.handleControllerButtonClick(MoveAction.MOVE_RIGHT)}>→
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>);
    }
}
