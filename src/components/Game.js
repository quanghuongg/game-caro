import React from 'react'
import Board from './Board'

const defaultWidth = 20
const defaultHeight = 20
const nSquareToWin = 5
function calculateWinner(squares) {
    let win
    for (let i = 0; i < squares.length; i++) {
        for (let j = 0; j < squares[i].length; j++) {
            // eslint-disable-next-line no-continue
            if (!squares[i][j]) continue
            if (j <= squares[i].length - nSquareToWin) {
                win = true
                for (let k = 0; k < nSquareToWin - 1; k++) {
                    if (squares[i][j + k] !== squares[i][j + k + 1]) {
                        win = false
                    }
                }
                if (win)
                    return {
                        val: squares[i][j],
                        x: j,
                        y: i,
                        direction: 'ToRight'
                    }
            }
            if (i <= squares.length - nSquareToWin) {
                win = true
                for (let k = 0; k < nSquareToWin - 1; k++) {
                    if (squares[i + k][j] !== squares[i + k + 1][j]) {
                        win = false
                    }
                }
                if (win)
                    return {
                        val: squares[i][j],
                        x: j,
                        y: i,
                        direction: 'ToDown'
                    }
            }
            if (
                j <= squares[i].length - nSquareToWin &&
                i <= squares.length - nSquareToWin
            ) {
                win = true
                for (let k = 0; k < nSquareToWin - 1; k++) {
                    if (
                        squares[i + k][j + k] !== squares[i + k + 1][j + k + 1]
                    ) {
                        win = false
                    }
                }
                if (win)
                    return {
                        val: squares[i][j],
                        x: j,
                        y: i,
                        direction: 'ToRightDown'
                    }
            }
            if (i <= squares.length - nSquareToWin && j >= nSquareToWin - 1) {
                win = true
                for (let k = 0; k < nSquareToWin - 1; k++) {
                    if (
                        squares[i + k][j - k] !== squares[i + k + 1][j - k - 1]
                    ) {
                        win = false
                    }
                }
                if (win)
                    return {
                        val: squares[i][j],
                        x: j,
                        y: i,
                        direction: 'ToLeftDown'
                    }
            }
        }
    }
    return null
}
class Game extends React.Component {
    constructor(props) {
        super(props)
        const tmpArr = Array(defaultHeight)
        for (let i = 0; i < defaultHeight; i++) {
            tmpArr[i] = Array(defaultWidth).fill(null)
        }
        this.state = {
            inputWidth: defaultWidth,
            inputHeight: defaultHeight,
            history: [
                {
                    squares: tmpArr,
                    location: null
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            isDescending: true
        }
        this.sort = this.sort.bind(this)
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0
        })
    }

    handleClick(i, j) {
        const { stepNumber, xIsNext, history } = this.state
        const newHistory = history.slice(0, stepNumber + 1)
        const current = newHistory[stepNumber]
        const squares = current.squares.slice()
        current.squares.map((row, idx) => {
            squares[idx] = current.squares[idx].slice()
            return true
        })
        if (calculateWinner(squares) || squares[i][j]) {
            return
        }
        squares[i][j] = xIsNext ? 'X' : 'O'
        this.setState({
            history: newHistory.concat([
                {
                    squares,
                    location: { x: i, y: j }
                }
            ]),
            stepNumber: newHistory.length,
            xIsNext: !xIsNext
        })
    }

    sort() {
        const { isDescending } = this.state
        this.setState({ isDescending: !isDescending })
    }

    render() {
        const {
            history,
            stepNumber,
            isDescending,
            xIsNext,
            inputWidth,
            inputHeight
        } = this.state
        const current = history[stepNumber]
        const winner = calculateWinner(current.squares)

        let moves = history.map((step, move) => {
            const desc = move
                ? `Go to move #${move} (${step.location.x},${step.location.y})`
                : 'Go to game start'
            return stepNumber === move ? (
              // eslint-disable-next-line react/no-array-index-key
                <li key={move}>
                    <button
                        type="submit"
                        className="btn-bold"
                        onClick={() => this.jumpTo(move)}
                    >
                        {desc}
                    </button>
                </li>
            ) : (
                // eslint-disable-next-line react/no-array-index-key
                <li key={move}>
                    <button type="submit" onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            )
        })
        if (!isDescending) {
            moves = moves.reverse()
        }

        let status
        if (winner) {
            status = `Winner: ${winner.val}`
        } else {
            status = `Next player: ${xIsNext ? 'X' : 'O'}`
        }

        const arrow = isDescending ? '↓' : '↑'
        return (
            <div className="content">
                <div className="game-config">
                    <span className="fixed-size">Width:</span>
                    <input
                        type="number"
                        placeholder="Width"
                        disabled
                        value={inputWidth}
                    />
                    <br />
                    <span className="fixed-size">Height:</span>
                    <input
                        type="number"
                        placeholder="Height"
                        disabled
                        value={inputHeight}
                    />
                </div>
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={(i, j) => this.handleClick(i, j)}
                            winner={winner}
                        />
                    </div>
                    <div className="game-info">
                        <div style={{ margin: 2 }}>
                            <button type="submit" onClick={this.sort}>
                                History {arrow}
                            </button>
                        </div>
                        {winner ? (
                            <div style={{ color: 'red' }}>{status}</div>
                        ) : (
                            <div>{status}</div>
                        )}
                        <ol>{moves}</ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game
