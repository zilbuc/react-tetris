import { Board, BrickCommands } from "./types";
import { boardHeight, boardWidth, bricks, initialState } from "./constants";

export const generateBrick = () => Math.floor(Math.random() * 7 + 1)

export const generateEmptyBoard = (): number[][] => {
	const board = []

	for (let y = 0; y < boardHeight; y++) {
		const row = new Array(boardWidth).fill(0)
		board.push(row)
	}

	return board
}

export const getInterval = (level: number): number => (1000 - (level * 50 > 600 ? 600 : level * 50))

export const getNewLevel = (score: number) => 1 + Math.floor(score / 5)

export const removeBrickFromBoard = (
	board: Board,
	brick: number,
	rotate: number,
	x: number,
	y: number
): Board => {
	const newBoard = board

	for (let i = 0; i < 4; i++) {
		newBoard[y + bricks[brick][rotate][i][1]][x + bricks[brick][rotate][i][0]] = 0
	}

	return newBoard
}

export const addBrickToBoard = (
	board: Board,
	brick: number,
	rotate: number,
	x: number,
	y: number
): Board => {
	const newBoard = board

	for (let i = 0; i < 4; i++) {
		newBoard[y + bricks[brick][rotate][i][1]][x + bricks[brick][rotate][i][0]] = brick
	}

	return newBoard
}

const getNewCoordinate = (
	currentCoordinate: number,
	change: number,
	brickCoordinate: number
): number => currentCoordinate + change + brickCoordinate

export const getNewXCoordinate = (
	xChange: number,
	board: Board,
	brick: number,
	rotate: number,
  x: number,
	y: number,
): number => {

	for (let i = 0; i < 4; i++) {
		const newXCoordinate = getNewCoordinate(x, xChange, bricks[brick][rotate][i][0])
		const newYCoordinate = getNewCoordinate(y, 0, bricks[brick][rotate][i][1])

		if (newXCoordinate >= 0	&& newXCoordinate < boardWidth) {
			if (board[newYCoordinate][newXCoordinate] !== 0) {
				return x
			}
		} else {
			return x
		}
	}

	return x + xChange
}

export const getNewYCoordinate = (
	yChange: number,
	board: Board,
	brick: number,
	rotate: number,
  x: number,
	y: number,
): number => {

	for (let i = 0; i < 4; i++) {
		const newXCoordinate = getNewCoordinate(x, 0, bricks[brick][rotate][i][0])
		const newYCoordinate = getNewCoordinate(y, yChange, bricks[brick][rotate][i][1])

		if (newYCoordinate >= 0	&& newYCoordinate < boardHeight) {
			if (board[newYCoordinate][newXCoordinate] !== 0) {
				return y
			}
		} else {
			return y
		}
	}

	return y + yChange
}

export const getNewRotate = (
	rotateChange: number,
	board: Board,
	brick: number,
	rotate: number,
	x: number,
	y: number,
): number => {

	let newRotate = rotate + rotateChange > 3 ? 0 : rotate + rotateChange

		for (let i = 0; i < 4; i++) {
			const newXCoordinate = getNewCoordinate(x, 0, bricks[brick][newRotate][i][0])
			const newYCoordinate = getNewCoordinate(y, 0, bricks[brick][newRotate][i][1])

			if (newXCoordinate >= 0 && newXCoordinate < boardWidth && newYCoordinate >= 0 && newYCoordinate < boardHeight) {
				if (board[newYCoordinate][newXCoordinate] !== 0) {
					return rotate
				}
			} else {
				return rotate
			}
		}

	return newRotate
}

export const removeFullRows = (board: Board): { newBoard: Board, scoreChange: number } => {
	let scoreChange = 0

	for (let row = boardHeight - 1; row >= 0; row--) {
		let isRowFull = true

		for (let col = 0; col < boardWidth; col++) {
			if (board[row][col] === 0) {
				isRowFull = false
			}
		}

		if (isRowFull) {
			scoreChange++

			for (let i = row; i > 0; i--) {
				for (let col = 0; col < boardWidth; col++) {
					board[i][col] = board[i - 1][col]
				}
			}

			row = boardHeight
		}
	}

	return {
		newBoard: board,
		scoreChange
	}
}

export const verifyIfNewBrickFitsTheBoard = (board: Board, brick: number): boolean => {
	for (let i = 0; i < 4; i++) {
		if (board[getNewCoordinate(
			initialState.currentBrickY,
			0,
			bricks[brick][initialState.brickRotate][i][1]
		)][getNewCoordinate(
			initialState.currentBrickX,
			0,
			bricks[brick][initialState.brickRotate][i][0]
		)] !== 0) {
			return false
		}
	}

	return true
}

export const getBrickChange = (command: BrickCommands) => ({
	xChange: command === BrickCommands.LEFT ? -1
		: command === BrickCommands.RIGHT ? 1 : 0,
	yChange: command === BrickCommands.DOWN ? 1 : 0,
	rotateChange: command === BrickCommands.ROTATE ? 1 : 0
})
