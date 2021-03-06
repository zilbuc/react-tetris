import { generateBrick, generateEmptyBoard } from "./helpers";
import { TetrisState } from "./types";

export const boardWidth = 10
export const boardHeight = 20
export const initialState: TetrisState = {
	gameOver: false,
	gamePaused: false,
	score: 0,
	level: 1,
	currentBrickX: 5,
	currentBrickY: 1,
	currentBrick: generateBrick(),
	brickRotate: 0,
	board: generateEmptyBoard(),
}

export const bricks = [
	[
		// The default square
		[[0, 0], [0, 0], [0, 0], [0, 0]],
		[[0, 0], [0, 0], [0, 0], [0, 0]],
		[[0, 0], [0, 0], [0, 0], [0, 0]],
		[[0, 0], [0, 0], [0, 0], [0, 0]]
	],
	[
		// The cube tile (block 2x2)
		[[0, 0], [1, 0], [0, 1], [1, 1]],
		[[0, 0], [1, 0], [0, 1], [1, 1]],
		[[0, 0], [1, 0], [0, 1], [1, 1]],
		[[0, 0], [1, 0], [0, 1], [1, 1]]
	],
	[
		// The I tile
		[[0, -1], [0, 0], [0, 1], [0, 2]],
		[[-1, 0], [0, 0], [1, 0], [2, 0]],
		[[0, -1], [0, 0], [0, 1], [0, 2]],
		[[-1, 0], [0, 0], [1, 0], [2, 0]]
	],
	[
		// The T tile
		[[0, 0], [-1, 0], [1, 0], [0, -1]],
		[[0, 0], [1, 0], [0, 1], [0, -1]],
		[[0, 0], [-1, 0], [1, 0], [0, 1]],
		[[0, 0], [-1, 0], [0, 1], [0, -1]]
	],
	[
		// The inverse L tile
		[[0, 0], [-1, 0], [1, 0], [-1, -1]],
		[[0, 0], [0, 1], [0, -1], [1, -1]],
		[[0, 0], [1, 0], [-1, 0], [1, 1]],
		[[0, 0], [0, 1], [0, -1], [-1, 1]]
	],
	[
		// The L tile
		[[0, 0], [1, 0], [-1, 0], [1, -1]],
		[[0, 0], [0, 1], [0, -1], [1, 1]],
		[[0, 0], [1, 0], [-1, 0], [-1, 1]],
		[[0, 0], [0, 1], [0, -1], [-1, -1]]
	],
	[
		// The Z tile
		[[0, 0], [1, 0], [0, -1], [-1, -1]],
		[[0, 0], [1, 0], [0, 1], [1, -1]],
		[[0, 0], [1, 0], [0, -1], [-1, -1]],
		[[0, 0], [1, 0], [0, 1], [1, -1]]
	],
	[
		// The inverse Z tile
		[[0, 0], [-1, 0], [0, -1], [1, -1]],
		[[0, 0], [0, -1], [1, 0], [1, 1]],
		[[0, 0], [-1, 0], [0, -1], [1, -1]],
		[[0, 0], [0, -1], [1, 0], [1, 1]]
	]
]

export const listener = 'keydown'
