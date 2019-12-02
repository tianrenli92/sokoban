/**
 * @typedef {number} MoveAction
 * @typedef {number[]} MoveDiff
 * @typedef {number} KeyMap
 **/

/**
 * Represents move action types.
 * @enum {MoveAction}
 */
export const MoveAction = {
    MOVE_UP: 0,
    MOVE_RIGHT: 1,
    MOVE_DOWN: 2,
    MOVE_LEFT: 3,
};

/**
 * Represents difference of x and y positions of move action types.
 * @enum {MoveDiff}
 */
export const MoveDiff = {
    [MoveAction.MOVE_UP]: [-1, 0],
    [MoveAction.MOVE_RIGHT]: [0, 1],
    [MoveAction.MOVE_DOWN]: [1, 0],
    [MoveAction.MOVE_LEFT]: [0, -1],
};

/**
 * Represents the mapping between pressed keys and move actions.
 * @enum {KeyMap}
 */
export const KeyMap = {
    38: MoveAction.MOVE_UP,
    39: MoveAction.MOVE_RIGHT,
    40: MoveAction.MOVE_DOWN,
    37: MoveAction.MOVE_LEFT,
};
