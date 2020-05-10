import * as React from 'react'
import classNames from 'classnames'
import {
	addBrickToBoard,
	getBrickChange,
	generateEmptyBoard,
	generateBrick,
	getInterval,
	getNewRotate,
	getNewLevel,
	getNewXCoordinate,
	getNewYCoordinate,
	initialState,
	listener,
	removeBrickFromBoard,
	removeFullRows,
	verifyIfNewBrickFitsTheBoard
} from "../utils";
import { BrickCommands, TetrisState, KeyboardKeys } from "../utils/types";

import styles from './Tetris.module.scss'

class Tetris extends React.Component<{}, TetrisState> {
	state = {
		gameOver: initialState.gameOver,
		gamePaused: initialState.gamePaused,
		score: initialState.score,
		level: initialState.level,
		currentBrickX: initialState.currentBrickX,
		currentBrickY: initialState.currentBrickY,
		currentBrick: initialState.currentBrick,
		brickRotate: initialState.brickRotate,
		board: initialState.board
	}

	intervalId: NodeJS.Timeout = setInterval(
		() => this.handleBoardUpdate(BrickCommands.DOWN),
		getInterval(this.state.level))

	componentDidMount() {
		window.addEventListener(listener, this.handleKeyPress)
	}

	componentWillUnmount() {
		clearInterval(this.intervalId)
		window.removeEventListener(listener, this.handleKeyPress)
	}

	handleKeyPress = (e: { code: string }): void => {
		const { code } = e
		switch (code) {
			case KeyboardKeys.NEW_GAME:
				this.startNewGame()
				break
			case KeyboardKeys.PAUSE:
				this.handlePauseClick()
				break
			case KeyboardKeys.ROTATE:
				this.handleBoardUpdate(BrickCommands.ROTATE)
				break
			case KeyboardKeys.DOWN:
				this.handleBoardUpdate(BrickCommands.DOWN)
				break
			case KeyboardKeys.LEFT:
				this.handleBoardUpdate(BrickCommands.LEFT)
				break
			case KeyboardKeys.RIGHT:
				this.handleBoardUpdate(BrickCommands.RIGHT)
				break
			default:
				return
		}
	}

	handleBoardUpdate(command: BrickCommands) {

		if (this.state.gameOver || this.state.gamePaused) {
			return
		}

		const { xChange, yChange, rotateChange } = getBrickChange(command)

		let board = this.state.board
		let brick = this.state.currentBrick
		let rotate = this.state.brickRotate
		let x = this.state.currentBrickX
		let y = this.state.currentBrickY

		board = removeBrickFromBoard(board, brick, rotate, x, y)

		rotate = !!rotateChange ? getNewRotate(rotateChange, board, brick, rotate, x, y) : rotate
		x = !!xChange ? getNewXCoordinate(xChange, board, brick, rotate, x, y) : x
		y = !!yChange ? getNewYCoordinate(yChange, board, brick, rotate, x, y) : y

		board = addBrickToBoard(board, brick, rotate, x, y)

		if (y === this.state.currentBrickY && yChange !== 0) {

			const { newBoard, scoreChange } = removeFullRows(board)
			board = newBoard

			if (scoreChange > 0) {
				this.setState(({ score }) => ({
					score: score + scoreChange,
					level: getNewLevel(score + scoreChange)
				}))
			}

			clearInterval(this.intervalId)
			this.intervalId = setInterval(
				() => this.handleBoardUpdate(BrickCommands.DOWN),
				getInterval(this.state.level)
			)

			brick = generateBrick()
			x = initialState.currentBrickX
			y = initialState.currentBrickY
			rotate = initialState.brickRotate

			if (verifyIfNewBrickFitsTheBoard(board, brick)) {
				board = addBrickToBoard(board, brick, rotate, x, y)
			} else {
				this.setState({
					gameOver: true
				})
			}
		}

		this.setState({
			board: board,
			currentBrickX: x,
			currentBrickY: y,
			brickRotate: rotate,
			currentBrick: brick
		})
	}

	handlePauseClick = () => {
		this.setState(({ gamePaused }) => ({
			gamePaused: !gamePaused
		}))
	}

	startNewGame = () => {
		this.setState({
			gameOver: initialState.gameOver,
			gamePaused: initialState.gamePaused,
			score: initialState.score,
			level: initialState.level,
			currentBrickX: initialState.currentBrickX,
			currentBrickY: initialState.currentBrickY,
			currentBrick: generateBrick(),
			brickRotate: initialState.brickRotate,
			board: generateEmptyBoard()
		})
	}

	render() {

		const { board, gameOver, score } = this.state
		console.log(this.state.level, getInterval(this.state.level))

		return (
			<div className={styles.tetrisWrapper}>
				<div>
					{board.map((row, index) => {
						const cols = row.map((column: number, index: number) =>
							<div className={classNames(styles.brick, { [styles.noLongerEmpty]: column})} key={index} />)

						return <div className={styles.boardRow} key={index}>{cols}</div>
					})}
				</div>

				<div className={classNames(styles.score, { [styles.gameOver]: gameOver })}>{score}</div>
			</div>
		)
	}
}

export default Tetris
