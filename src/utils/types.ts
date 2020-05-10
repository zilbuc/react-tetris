export type Board = number[][]

export interface TetrisState {
	gameOver: boolean
	gamePaused: boolean
	score: number
	level: number
	currentBrickX: number
	currentBrickY: number
	currentBrick: number
	brickRotate: number
	board: Board
}


export enum KeyboardKeys {
	NEW_GAME = 'KeyN',
	PAUSE = 'Space',
	ROTATE = 'ArrowUp',
	DOWN = 'ArrowDown',
	LEFT = 'ArrowLeft',
	RIGHT = 'ArrowRight'
}

export enum BrickCommands {
	DOWN = 'Down',
	LEFT = 'Left',
	RIGHT = 'Right',
	ROTATE = 'Rotate'
}
